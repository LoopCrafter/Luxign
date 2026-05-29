"use client";

import { buttonVariants } from "@/src/components/ui/button";
import { cn } from "@/src/lib/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function PaymentCancelPage() {
  const router = useRouter();

  return (
    <div className="min-h-[50vh] flex items-center justify-center">
      <div className="border rounded-xl p-8 shadow-md max-w-md w-full text-center space-y-4">
        <div className="text-5xl">⚠️</div>

        <h1 className="text-2xl font-bold">Payment Cancelled</h1>

        <p className="text-muted-foreground">
          Your payment was cancelled. No charges were made.
        </p>

        <div className="space-y-2 pt-2 flex flex-col">
          <Link
            href="/dashboard/buy-credit"
            className={cn(
              "w-full h-10 rounded-md bg-primary text-primary-foreground",
              buttonVariants(),
            )}
          >
            Try Again
          </Link>

          <Link
            href="/dashboard"
            className={cn(
              "w-full h-10 rounded-md border",
              buttonVariants({ variant: "outline" }),
            )}
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
