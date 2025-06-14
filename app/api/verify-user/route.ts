import { db } from "@/db";
import { Users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const user = await req.json();
  const email = user?.primaryEmailAddress?.emailAddress;

  if (!email) {
    return NextResponse.json({ error: "No email provided" }, { status: 400 });
  }

  try {
    const userInfo = await db
      .select()
      .from(Users)
      .where(eq(Users.email, email));
    // If user does NOT exist in DB
    if (userInfo.length === 0) {
      const saveResult = await db
        .insert(Users)
        .values({
          name: user?.fullName,
          email,
          imageUrl: user?.imageUrl,
        })
        .returning();

      return NextResponse.json({ results: saveResult[0] });
    }
    // If User  exist in DB
    await db
      .update(Users)
      .set({ lastVisitTime: new Date() })
      .where(eq(Users.email, email))
      .returning();

    return NextResponse.json({ result: userInfo[0] });
  } catch (e) {
    return NextResponse.json(
      { error: e || "Something went wrong" },
      { status: 500 }
    );
  }
}
