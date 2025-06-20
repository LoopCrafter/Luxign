import { db } from "@/db";
import { AiGeneratedImage } from "@/db/schema";
import { convertImageUrlToBase64 } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import Replicate from "replicate";
const replicate = new Replicate({
  auth: process.env.NEXT_PUBLIC_REPLICATE_API_TOKEN!,
});

export async function POST(request: Request) {
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
      { input }
    );

    if (!output || typeof output !== "string") {
      throw new Error("Output is not a valid image URL,Try again later");
    }

    const base64ImageUrl = await convertImageUrlToBase64(output);
    const formData = new FormData();
    formData.append("file", base64ImageUrl);

    const uploadResponse = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/upload`,
      {
        method: "POST",
        body: formData,
      }
    );
    const uploadResult = await uploadResponse.json();
    const finalImageUrl = uploadResult.url;

    const dbResult = await db
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
      { status: 200 }
    );
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      {
        error: e,
      },
      { status: 500 }
    );
  }
}
