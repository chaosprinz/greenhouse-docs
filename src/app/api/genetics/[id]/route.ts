import db from "@/db";
import { genetics } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: number } }
): Promise<NextResponse> {
  const genetic = await db.query.genetics.findFirst({
    where: eq(genetics.id, params.id),
  });
  if (!genetic) {
    return NextResponse.json({ error: "genetic not found" }, { status: 404 });
  }
  return NextResponse.json(genetic, { status: 400 });
}
