"use server";

import Stripe from "stripe";
import { redirect } from "next/navigation";
import { CREDIT_PLANS } from "../constants/plans";
import { CreditPlanId } from "@/src/types";
import { auth } from "@clerk/nextjs/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function createCheckoutSession(planId: CreditPlanId) {
  const plan = CREDIT_PLANS.find((item) => item.id === planId);
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }
  if (!plan) {
    throw new Error("Invalid plan");
  }

  const session = await stripe.checkout.sessions.create({
    mode: "payment",

    payment_method_types: ["card"],

    line_items: [
      {
        price_data: {
          currency: "usd",

          product_data: {
            name: `${plan.count} AI Credits`,

            description:
              "Credits for generating AI images and premium features",

            images: ["https://yourdomain.com/credits-cover.png"],
          },

          unit_amount: Math.round(plan.price * 100),
        },

        quantity: 1,
      },
    ],

    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/payment-success`,

    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/payment-cancel`,

    metadata: {
      userId,
      credits: String(plan.count),
    },
  });

  if (!session.url) {
    throw new Error("No checkout URL");
  }

  redirect(session.url);
}
