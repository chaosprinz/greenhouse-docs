import {
  createGenetic,
  GeneticIncludes,
  GeneticInput,
  toDbError,
} from "@/lib/data";
import { NextResponse } from "next/server";
import { createResponse } from "../createResponse";

export async function postGeneticResponse(
  geneticData: GeneticInput,
  includes?: GeneticIncludes
): Promise<NextResponse> {
  try {
    const genetic = await createGenetic(geneticData, includes);
    return createResponse({
      success: genetic.success,
      status: 200,
      data: genetic,
    });
  } catch (err) {
    return createResponse({
      success: false,
      status: 500,
      error: toDbError(err),
    });
  }
}
