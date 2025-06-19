import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { image, roomType, designType, additionalReq } = await request.json();

  return NextResponse.json({
    status: 200,
    image,
    roomType,
    designType,
    additionalReq,
  });
}
