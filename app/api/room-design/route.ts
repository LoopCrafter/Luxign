import { getDb } from "@/db";
import { AiGeneratedImage } from "@/db/schema";
import cloudinary from "@/lib/cloudinary.server";
import { NextResponse } from "next/server";
import Replicate from "replicate";
const replicate = new Replicate({
  auth: process.env.NEXT_PUBLIC_REPLICATE_API_TOKEN!,
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

export async function POST(request: Request) {
  const baseUrl = `${process.env.NEXT_PUBLIC_BASE_URL}`;
  const { image, roomType, designType, additionalReq, userEmail } =
    await request.json();
  //convert image to AI image
  try {
    const input = {
      image,
      prompt: `A realistic ${designType} style ${roomType} interior, high-resolution, wide-angle view, soft natural lighting, detailed furniture and decoration, photorealistic${
        additionalReq ? `, ${additionalReq}` : ""
      }`,
    };

    const output = await replicate.run(
      "adirik/interior-design:76604baddc85b1b4616e1c6475eca080da339c8875bd4996705440484a6eac38",
      { input },
    );

    if (!output || typeof output !== "string") {
      throw new Error("Output is not a valid image URL,Try again later");
    }

    const uploadResult = await uploadFromUrl(output);

    const finalImageUrl = uploadResult.secure_url;

    await getDb()
      .insert(AiGeneratedImage)
      .values({
        roomType,
        designType,
        originalImage: image,
        aiImage: finalImageUrl,
        userEmail,
      })
      .returning({ id: AiGeneratedImage.id });
    return NextResponse.json(
      {
        results: finalImageUrl,
      },
      { status: 200 },
    );
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      {
        error: e,
      },
      { status: 500 },
    );
  }
}
