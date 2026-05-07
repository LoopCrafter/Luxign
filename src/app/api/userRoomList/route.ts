import { auth, clerkClient } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { count, desc, eq } from "drizzle-orm";
import { getDb } from "@/db";
import { AiGeneratedImage } from "@/db/schema";

export async function GET(req: NextRequest) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const searchParams = req.nextUrl.searchParams;

  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 6;

  const offset = (page - 1) * limit;

  const client = await clerkClient();
  const user = await client.users.getUser(userId);

  const userEmail = user?.primaryEmailAddress?.emailAddress;

  if (!userEmail) {
    return NextResponse.json(
      { error: "User email not found" },
      { status: 404 },
    );
  }

  const result = await getDb()
    .select()
    .from(AiGeneratedImage)
    .where(eq(AiGeneratedImage.userEmail, userEmail))
    .orderBy(desc(AiGeneratedImage.id))
    .limit(limit)
    .offset(offset);

  const [totalCountResult] = await getDb()
    .select({
      count: count(),
    })
    .from(AiGeneratedImage)
    .where(eq(AiGeneratedImage.userEmail, userEmail));

  const totalCount = totalCountResult.count;

  const totalPages = Math.ceil(totalCount / limit);

  return NextResponse.json(
    {
      result,
      pagination: {
        page,
        limit,
        totalPages,
      },
    },
    { status: 200 },
  );
}
