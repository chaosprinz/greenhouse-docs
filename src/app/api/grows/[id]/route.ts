import { getGrowResponse } from "@/lib/responses";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: number } }
): Promise<NextResponse> {
  return getGrowResponse((await params).id, {
    genetic: true,
    measurings: true,
  });
}
