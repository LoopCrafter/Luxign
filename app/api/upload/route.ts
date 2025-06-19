import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file || typeof file === "string") {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const timestamp = Date.now();
    const publicId = `${timestamp}_row`;
    const uploadPromise = new Promise<any>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          public_id: publicId,
          resource_type: "image",
          type: "upload",
          folder: "room-design",
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      stream.end(buffer);
    });

    const result = await uploadPromise;

    const signedUrl = cloudinary.url(result.public_id, {
      // type: "authenticated",
      sign_url: true,
      expires_at: Math.floor(Date.now() / 1000) + 5 * 60,
    });

    return NextResponse.json({ url: signedUrl });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message || "Upload failed" },
      { status: 500 }
    );
  }
}
