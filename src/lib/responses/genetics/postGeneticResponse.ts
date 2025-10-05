import {
  createGenetic,
  DbError,
  GeneticIncludes,
  GeneticInput,
  toDbError,
  ValidationError,
} from "@/lib/data";
import { NextResponse } from "next/server";
import { createResponse } from "../createResponse";
import { $ZodIssue } from "zod/v4/core";

export async function postGeneticResponse(
  geneticData: GeneticInput,
  includes?: GeneticIncludes
): Promise<NextResponse> {
  try {
    const genetic = await createGenetic(geneticData, includes);
    return createResponse({
      success: true,
      data: genetic,
      status: 200,
    });
  } catch (err) {
    const errorData: {
      success: boolean;
      status: number;
      error: DbError;
      issues: undefined | $ZodIssue[];
    } = {
      success: false,
      status: 500,
      error: toDbError(err),
      issues: undefined,
    };
    if (err instanceof ValidationError) {
      errorData.issues = err.issues ?? undefined;
    }
    return createResponse<typeof err>(errorData);
  }
}
