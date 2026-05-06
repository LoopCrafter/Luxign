"use client";
import { Button } from "@/src/components/ui/button";
import AdditionalReq from "./AdditionalReq";
import DesignType from "./DesignType";
import ImageSelection from "./ImageSelection";
import RoomTypes from "./RoomTypes";
import { useState } from "react";
import { z } from "zod";
import { useUser } from "@clerk/nextjs";
import CustomLoading from "./CustomLoading";
import { toast } from "sonner";
import { useUserDetail } from "@/src/hooks";
import { CreditLimitAlertDialog } from "./CreditLimitAlertDialog";
import AiOutputDialog from "../../_components/AiOutputDialog";
import { Container } from "@/src/components/layout/Container";

const FormSchema = z.object({
  image: z.instanceof(File, { message: "Please upload an image" }),
  roomType: z.string().min(1, "Room type is required"),
  designType: z.string().min(1, "Design type is required"),
  additionalReq: z.string().optional(),
});

type FormSchema = z.infer<typeof FormSchema>;

const CreateNew = () => {
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [aiImageOutputUrl, setAiImageOutputUrl] = useState("");
  const [originalImageUrl, setOriginalImageUrl] = useState("");
  const [showCreditLimitDialog, setShowCreditLimitDialog] = useState(false);
  const [blurDataURL, setBlurDataURL] = useState("");
  const [showAiOutputDialog, setShowAiOutputDialog] = useState(false);
  const { setUserDetail, userDetail } = useUserDetail();
  const [formData, setFormData] = useState<{
    image: File | null;
    roomType: string;
    designType: string;
    additionalReq: string;
  }>({
    image: null,
    roomType: "",
    designType: "",
    additionalReq: "",
  });
  const [formErrors, setFormErrors] = useState<
    Partial<Record<keyof typeof formData, string>>
  >({});

  const onHandleInputChange = (value: any, key: keyof typeof formData) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    setFormErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const validateForm = async () => {
    if (userDetail?.credit === 0) {
      setShowCreditLimitDialog(true);
      return;
    }
    const result = FormSchema.safeParse(formData);
    if (!result.success) {
      const zodErrors: typeof formErrors = {};
      result.error.errors.forEach((err) => {
        const field = err.path[0] as keyof typeof formData;
        zodErrors[field] = err.message;
      });
      setFormErrors(zodErrors);
      return false;
    }
    setLoading(true);
    try {
      const url = await uploadImage();
      const { roomType, designType, additionalReq } = formData;
      const res = await fetch("/api/room-design", {
        method: "POST",
        body: JSON.stringify({
          image: url,
          roomType: roomType,
          designType: designType,
          additionalReq: additionalReq,
          userEmail: user?.primaryEmailAddress?.emailAddress,
        }),
      });

      if (!res.ok) {
        throw new Error(
          res.statusText || "Request failed, Please try again later",
        );
      }
      const data = await res.json();
      setAiImageOutputUrl(data.results);
      setOriginalImageUrl(url);
      console.log("hamed", data);
      setBlurDataURL(data.results.blurDataUrl);
      setShowAiOutputDialog(true);
      setUserDetail((prev) =>
        prev ? { ...prev, credit: (userDetail?.credit ?? 1) - 1 } : null,
      );
    } catch (e) {
      if (e instanceof Error) {
        toast.error(e.message, { position: "top-center" });
      } else {
        toast.error("Something wrong. please try again later!", {
          position: "top-center",
        });
      }
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const uploadImage = async () => {
    const formDataImage = new FormData();
    const imageFile = formData.image;
    if (imageFile instanceof File) {
      formDataImage.append("file", imageFile);
    }
    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formDataImage,
      });
      const data = await res.json();
      return data.url;
    } catch (e) {
      throw new Error("something is wrong");
    }
  };

  const handleClosePreview = () => {
    setShowAiOutputDialog(false);
    setFormData({
      image: null,
      roomType: "",
      designType: "",
      additionalReq: "",
    });
  };

  return (
    <Container>
      <div className="p-6">
        <h2 className="font-bold text-4xl text-primary text-center">
          Experience the Magic of AI Remodeling
        </h2>
        <p className="text-center text-gray-500">
          Transform any room with a click. Select a space, choose a style, and
          watch as AI instantly remains your environment.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 items-start gap-6 justify-center mt-10">
          <ImageSelection
            handleSelectedImage={(value) => onHandleInputChange(value, "image")}
            error={formErrors.image}
          />
          <div>
            <RoomTypes
              selectedRoomType={(value) =>
                onHandleInputChange(value, "roomType")
              }
              error={formErrors.roomType}
            />
            <DesignType
              selectDesignType={(value) =>
                onHandleInputChange(value, "designType")
              }
              error={formErrors.designType}
            />
            <AdditionalReq
              additionalRequirementInput={(value) =>
                onHandleInputChange(value, "additionalReq")
              }
            />
            <Button className="w-full mt-5" onClick={validateForm}>
              Generate
            </Button>
            <p className="text-sm text-slate-400 mt-2 blockmb-52">
              NOTE: 1 Credit will use to redesign your room
            </p>
          </div>
        </div>
        <CustomLoading loading={loading} />
        {showAiOutputDialog ? (
          <AiOutputDialog
            openDialog={showAiOutputDialog}
            setCloseDialog={() => handleClosePreview}
            originalImage={originalImageUrl}
            aiGeneratedImage={aiImageOutputUrl}
            blurUrl={blurDataURL}
          />
        ) : null}
        <CreditLimitAlertDialog
          open={showCreditLimitDialog}
          onOpenChange={setShowCreditLimitDialog}
        />
      </div>
    </Container>
  );
};

export default CreateNew;
