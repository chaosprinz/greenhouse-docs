import { getGrowsResponse, postGrowResponse } from "@/lib/responses";
import { NextRequest, NextResponse } from "next/server";

export async function GET(_req: NextRequest): Promise<NextResponse> {
  return getGrowsResponse({
    genetic: true,
  });
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  const formData = await req.formData();

  const input = {
    geneticId: parseInt(formData.get("geneticId")?.toString() ?? "-1"),
  };

  return postGrowResponse(input);
}
