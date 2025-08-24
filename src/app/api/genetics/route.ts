import { NextRequest, NextResponse } from "next/server";
import { getAllGenetics } from "./_helper";

export async function GET(req: NextRequest) {
  const genetics = await getAllGenetics();
  return NextResponse.json(genetics, { status: 400 });
}
