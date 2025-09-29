import {
  DbError,
  Genetic,
  GeneticIncludes,
  getGenetic,
  toDbError,
} from "@/lib/data";
import { createResponse } from "../createResponse";
import { NextResponse } from "next/server";

export async function getGeneticResponse(
  id: number,
  includes?: GeneticIncludes
): Promise<NextResponse> {
  try {
    const genetic = await getGenetic(id, includes);

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
