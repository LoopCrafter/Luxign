import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { v2 as cloudinary } from "cloudinary";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function convertImageUrlToBase64(
  imageUrl: string,
): Promise<string> {
  try {
    const response = await fetch(imageUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch image. Status: ${response.status}`);
    }

    const buffer = await response.arrayBuffer();
    const base64 = Buffer.from(buffer).toString("base64");

    const contentType = response.headers.get("content-type") || "image/jpeg";

    return `data:${contentType};base64,${base64}`;
  } catch (error) {
    console.error("Error converting image to base64:", error);
    throw error;
  }
}

export async function uploadFromUrl(imageUrl: string) {
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
