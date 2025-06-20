import { AlertDialog, AlertDialogContent } from "@/components/ui/alert-dialog";
import { AlertDialogTitle } from "@radix-ui/react-alert-dialog";
import { FC } from "react";

type Props = {
  loading: boolean;
};
const CustomLoading: FC<Props> = ({ loading }) => {
  return (
    <AlertDialog open={loading}>
      <AlertDialogContent>
        <AlertDialogTitle />
        <div className="flex flex-col justify-center items-center min-h-44">
          <span className="loader mb-8"></span>
          <h2>Redesigning your Room ... Don't refresh the page</h2>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CustomLoading;
