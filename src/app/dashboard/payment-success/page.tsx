"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function PaymentSuccessPage() {
  const router = useRouter();

  useEffect(() => {
    // optional: show confetti / toast
  }, []);

  return (
    <div className="min-h-[50vh] flex items-center justify-center">
      <div className="border rounded-xl p-8 shadow-md max-w-md w-full text-center space-y-4">
        <div className="text-5xl">🎉</div>

        <h1 className="text-2xl font-bold">Payment Successful</h1>

        <p className="text-muted-foreground">
          Your credits have been added to your account.
        </p>

        <button
          onClick={() => router.push("/dashboard")}
          className="w-full h-10 rounded-md bg-primary text-primary-foreground"
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
}
