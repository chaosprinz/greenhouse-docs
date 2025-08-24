import { NextRequest, NextResponse } from "next/server";
import { createResponse, parseGrowId } from "./_helper";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const file = formData.get("file") as File | null;
    const growId: number = parseGrowId(formData.get("growId") as string | null);
    const description = formData.get("description") as string | null;

    const response = createResponse({ growId, file, description });
    return response;
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
