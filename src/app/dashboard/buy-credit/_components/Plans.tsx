"use client";

import { createCheckoutSession } from "@/src/lib/actions/stripe";
import { CREDIT_PLANS } from "@/src/lib/constants/plans";
import { CreditPlan } from "@/src/types";
import { useState, useTransition } from "react";

const Plans = () => {
  const [selectedPlan, setSelectedPlan] = useState<CreditPlan | null>(null);

  const [pending, startTransition] = useTransition();

  const handleCheckout = () => {
    if (!selectedPlan) return;

    startTransition(async () => {
      await createCheckoutSession(selectedPlan.id);
    });
  };

  return (
    <div className="space-y-10">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
        {CREDIT_PLANS.map((plan) => (
          <button
            key={plan.id}
            onClick={() => setSelectedPlan(plan)}
            className={`border rounded-xl p-5 shadow-md transition-all text-center ${
              selectedPlan?.id === plan.id
                ? "border-primary ring-2 ring-primary"
                : "hover:border-primary/50"
            }`}
          >
            <h2 className="text-3xl font-bold">{plan.count}</h2>

            <p className="text-muted-foreground">Credits</p>

            <p className="text-primary text-2xl font-semibold mt-3">
              ${plan.price}
            </p>
          </button>
        ))}
      </div>

      {selectedPlan && (
        <div className="border rounded-xl p-6 shadow-md max-w-md mx-auto space-y-5">
          <div>
            <h2 className="text-2xl font-bold">Order Summary</h2>

            <p className="text-muted-foreground mt-1">
              Review your selected plan before payment
            </p>
          </div>

          <div className="flex justify-between text-lg">
            <span>{selectedPlan.count} Credits</span>

            <span>${selectedPlan.price}</span>
          </div>

          <button
            onClick={handleCheckout}
            disabled={pending}
            className="w-full h-11 rounded-md bg-primary text-primary-foreground disabled:opacity-50"
          >
            {pending ? "Redirecting..." : "Continue to Payment"}
          </button>
        </div>
      )}
    </div>
  );
};

export default Plans;
