"use client";
import { Button } from "@/components/ui/button";
import AdditionalReq from "./_components/AdditionalReq";
import DesignType from "./_components/DesignType";
import ImageSelection from "./_components/ImageSelection";
import RoomTypes from "./_components/RoomTypes";
import { useState } from "react";

const CreateNewDesignPage = () => {
  const [formData, setFormData] = useState({});
  const onHandleInputChange = (value: File | string, fieldName: string) => {
    setFormData((prev) => ({ ...prev, [fieldName]: value }));
    console.log(formData);
  };

  return (
    <div>
      <h2 className="font-bold text-4xl text-primary text-center">
        Experience the Magic of AI Remodeling
      </h2>
      <p className="text-center text-gray-500">
        Transform any room with a click. Select a space, choose a style, and
        watch as AI instantly reimagines your environment.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 items-start gap-6 justify-center mt-10">
        <ImageSelection
          handleSelectedImage={(value) => onHandleInputChange(value, "image")}
        />
        <div>
          <RoomTypes
            selectedRoomType={(value) => onHandleInputChange(value, "roomType")}
          />
          <DesignType
            selectDesignType={(value) =>
              onHandleInputChange(value, "designType")
            }
          />
          <AdditionalReq
            additionalRequirementInput={(value) =>
              onHandleInputChange(value, "additionalReq")
            }
          />
          <Button className="w-full mt-5">Generate</Button>
          <p className="text-sm text-gray-400 mb-52">
            NOTE: 1 Credit will use to redesign your room
          </p>
        </div>
      </div>
    </div>
  );
};

export default CreateNewDesignPage;
