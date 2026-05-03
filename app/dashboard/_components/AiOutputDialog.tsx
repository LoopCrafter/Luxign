import { Button } from "@/components/ui/button";
import { ImageCompare } from "@/components/ui/ImageCompare";
import { downloadImage } from "@/lib/utils";
import { ImageDown } from "lucide-react";
import { FC } from "react";

type Props = {
  openDialog: boolean;
  originalImage: string;
  aiGeneratedImage: string;
  setCloseDialog: () => void;
};

const AiOutputDialog: FC<Props> = ({
  openDialog,
  originalImage,
  aiGeneratedImage,
  setCloseDialog,
}) => {
  return openDialog ? (
    <div className="fixed inset-0 w-full h-full bg-black/60 backdrop-blur-xs flex items-center justify-center p-10">
      <div className="w-1/2 h-full bg-white flex flex-col gap-6 items-center justify-between p-5 rounded-md">
        <div className="w-full">
          <h2 className="text-xl font-semibold">Result:</h2>
          <p className="text-xs text-gray-500">
            Compare the original image with the AI generated result.
          </p>
        </div>
        <div className="w-full flex-1 relative">
          <Button
            variant="ghost"
            className="text-white absolute top-2 left-2 z-10"
            onClick={() => downloadImage(aiGeneratedImage)}
          >
            <ImageDown className="size-6 " />
            <span>Download</span>
          </Button>
          <ImageCompare before={originalImage} after={aiGeneratedImage} />
        </div>
        <div className="flex items-end  w-full justify-end">
          <Button className="px-10 py-2" onClick={setCloseDialog}>
            Close
          </Button>
        </div>
      </div>
    </div>
  ) : null;
};

export default AiOutputDialog;
