import { GeneticIncludes, getGenetics, toDbError } from "@/lib/data";
import { NextResponse } from "next/server";
import { createResponse } from "../createResponse";

export async function getGeneticsResponse(
  includes?: GeneticIncludes
): Promise<NextResponse> {
  try {
    const genetics = await getGenetics(includes);
    return createResponse({
      success: genetics.success,
      status: 200,
      data: genetics,
    });
  } catch (err) {
    return createResponse({
      success: false,
      status: 500,
      error: toDbError(err),
    });
  }
}
