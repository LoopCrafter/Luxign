import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/src/components/ui/alert-dialog";
import { Button } from "@/src/components/ui/button";
import Link from "next/link";

type CreditLimitAlertDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function CreditLimitAlertDialog({
  open,
  onOpenChange,
}: CreditLimitAlertDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Credit limit reached</AlertDialogTitle>
          <AlertDialogDescription>
            You have reached your credit limit. Please top up your account to
            continue using the service.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="flex flex-col gap-2 sm:flex-row sm:justify-end">
          <Button asChild variant="outline" onClick={() => onOpenChange(false)}>
            <Link href="/dashboard">Back to Dashboard</Link>
          </Button>

          <Button asChild onClick={() => onOpenChange(false)}>
            <Link href="/dashboard/buy-credit">Buy Credit</Link>
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
