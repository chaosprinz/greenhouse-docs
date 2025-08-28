import db from "@/db";
import { GeneticWithGrows, getGeneticWithGrows } from "@/lib/data";
import { createErrorResponse, createSuccessResponse } from "@/lib/responses";
import { NextRequest, NextResponse } from "next/server";

const UNKOWN_DB_ERROR = "Unknown db-error";

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: number } }
): Promise<NextResponse> {
  try {
    const genetic: GeneticWithGrows = await getGeneticWithGrows({
      id: params.id,
    });
    return createSuccessResponse<GeneticWithGrows>({
      status: 200,
      data: genetic,
    });
  } catch (error) {
    return createErrorResponse({
      error: "Could not fetch genetic with grows from db",
      msg: error instanceof Error ? error.message : UNKOWN_DB_ERROR,
      details: error instanceof Error ? error : new Error(UNKOWN_DB_ERROR),
    });
  }
}
