import { Users, AiGeneratedImage } from "@/db/schema";
import { getDb } from "@/db";
import { eq, sql } from "drizzle-orm";
import { NextResponse } from "next/server";
import { auth, clerkClient } from "@clerk/nextjs/server";
import cloudinary from "@/src/lib/cloudinary.server";
import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN!,
});

async function uploadFromUrl(imageUrl: string) {
  const res = await fetch(imageUrl);
  const buffer = Buffer.from(await res.arrayBuffer());

  return new Promise<{ secure_url: string }>((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "room-design" },
      (err, result) => {
        if (err) reject(err);
        else resolve(result as any);
      },
    );
    stream.end(buffer);
  });
}

async function getBase64FromUrl(url: string) {
  const res = await fetch(url);
  const buffer = Buffer.from(await res.arrayBuffer());
  return `data:image/jpeg;base64,${buffer.toString("base64")}`;
}

export async function POST(request: Request) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const client = await clerkClient();
  const user = await client.users.getUser(userId);

  const { image, roomType, designType, additionalReq, userEmail } =
    await request.json();

  const db = getDb();
  try {
    const updatedUser = await db
      .update(Users)
      .set({
        credit: sql`${Users.credit} - 1`,
      })
      .where(sql`${Users.userId} = ${user.id} AND ${Users.credit} > 0`)
      .returning({
        id: Users.id,
        credit: Users.credit,
      });

    // ❌ no credit available
    if (!updatedUser.length) {
      return NextResponse.json(
        { message: "No credits left" },
        { status: 403, statusText: "No credits left" },
      );
    }

    // 🔥 STEP 2: AI generation
    const input = {
      image,
      prompt: `
[Task: Architectural Interior Transformation]
[Context: Image-to-Image spatial alignment]

Structure: ${designType} style interior architecture of a ${roomType}.
Composition: Wide-angle 24mm architectural photography, straight-on eye-level perspective, spatial balance.
Lighting: Volumetric global illumination, soft diffused natural daylight streaming from large windows, realistic ambient occlusion shadows.
Materials & Textures: Premium tactile surfaces, visible organic wood grain, polished matte stone, high-fidelity woven fabric textiles, brushed metal accents.
Visual Style: Professional interior design editorial, clean minimalist aesthetic, neutral balanced color grading, deep depth of field with sharp focus throughout.

${additionalReq ? `Modifications: ${additionalReq.trim()}` : ""}
  `.trim(),
    };

    const output = await replicate.run(
      "adirik/interior-design:76604baddc85b1b4616e1c6475eca080da339c8875bd4996705440484a6eac38",
      { input },
    );

    if (!output || typeof output !== "string") {
      throw new Error("AI generation failed");
    }

    const uploadResult = await uploadFromUrl(output);
    const finalImageUrl = uploadResult.secure_url;
    const blurUrl = finalImageUrl.replace(
      "/upload/",
      "/upload/w_40,h_40,c_fill,q_30,e_blur:1000/",
    );

    const blurBase64 = await getBase64FromUrl(blurUrl);

    // 🔥 STEP 3: save image
    await db.insert(AiGeneratedImage).values({
      roomType,
      designType,
      originalImage: image,
      aiImage: finalImageUrl,
      userEmail,
      blurDataUrl: blurBase64,
    });

    return NextResponse.json(
      { results: finalImageUrl, blurDataUrl: blurBase64 },
      { status: 200 },
    );
  } catch (e) {
    console.log(e);

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
