import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { FC } from "react";
import ReactBeforeSliderComponent from "react-before-after-slider-component";
import "react-before-after-slider-component/dist/build.css";

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
  return (
    <AlertDialog open={openDialog}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Result</AlertDialogTitle>
        </AlertDialogHeader>
        <ReactBeforeSliderComponent
          firstImage={{ imageUrl: aiGeneratedImage }}
          secondImage={{ imageUrl: originalImage }}
        />
        <Button onClick={setCloseDialog}>Close</Button>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AiOutputDialog;
