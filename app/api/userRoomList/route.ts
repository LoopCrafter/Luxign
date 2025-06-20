import { db } from "@/db";
import { AiGeneratedImage } from "@/db/schema";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const client = await clerkClient();
  const user = await client.users.getUser(userId);
  const userEmail = user?.primaryEmailAddress?.emailAddress;

  if (!userEmail) {
    return NextResponse.json(
      { error: "User email not found" },
      { status: 404 }
    );
  }

  const result = await db
    .select()
    .from(AiGeneratedImage)
    .where(eq(AiGeneratedImage.userEmail, userEmail));

  return NextResponse.json({ result }, { status: 200 });
}
