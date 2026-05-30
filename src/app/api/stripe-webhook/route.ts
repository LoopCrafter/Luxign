import Stripe from "stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { getDb } from "@/db";
import { Users } from "@/db/schema";
import { sql } from "drizzle-orm";

export async function POST(req: Request) {
  const stripeKey = process.env.STRIPE_SECRET_KEY;

  if (!stripeKey) {
    throw new Error("STRIPE_SECRET_KEY is missing");
  }
  const body = await req.text();
  const signature = (await headers()).get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "No signature" }, { status: 400 });
  }

  let event: Stripe.Event;

  const stripe = new Stripe(stripeKey);
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
  } catch (error) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    const userId = session.metadata?.userId;

    const credits = Number(session.metadata?.credits);
    const db = getDb();
    try {
      await db
        .update(Users)
        .set({
          credit: sql`${Users.credit} + ${credits}`,
        })
        .where(sql`${Users.userId} = ${userId}`);
    } catch (error) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 404 });
    }
  }

  return NextResponse.json({
    received: true,
  });
}
