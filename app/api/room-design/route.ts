import { NextResponse } from "next/server";
import Replicate from "replicate";
const replicate = new Replicate({
  auth: process.env.NEXT_PUBLIC_REPLICATE_API_TOKEN!,
});

export async function POST(request: Request) {
  const { image, roomType, designType, additionalReq } = await request.json();
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
    return NextResponse.json(
      {
        resutls: output,
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
  // await writeFile("output.png", output);
  // convert url to base64url

  //save base64 to cloudinary

  //save all to database

  return NextResponse.json({
    status: 200,
    image,
  });
}
