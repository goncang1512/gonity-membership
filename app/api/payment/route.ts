import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const body = await req.json();

  console.log("FROM POST : ", body);

  return NextResponse.json({
    status: true,
    statusCode: 200,
    message: "SUccess to payment",
  });
};
