import { getGeneticResponse } from "@/lib/responses";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: number } }
): Promise<NextResponse> {
  return getGeneticResponse((await params).id, {
    grows: true,
  });
}
