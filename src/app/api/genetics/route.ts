import { NextRequest, NextResponse } from "next/server";
import { createGenetic, GeneticInsertResult, getGenetics } from "@/lib/data";
import { z } from "zod";
import {
  createErrorResponse,
  createSuccessResponse,
  createValidationErrorResponse,
} from "@/lib/responses";
import { Genetic } from "@/db/schema";

const GeneticSchema = z.object({
  name: z.string().min(1),
  breeder: z.string().min(1),
  genus: z.string().min(1),
  type: z.string().min(1),
  productPage: z.string().url().optional(),
});

export async function GET(_req: NextRequest): Promise<NextResponse> {
  try {
    const genetics: Genetic[] = await getGenetics();

    return createSuccessResponse<Genetic[]>({
      status: 200,
      data: genetics,
    });
  } catch (error) {
    return createErrorResponse({
      status: 500,
      error: "No genetics fetched from db",
      msg: error instanceof Error ? error.message : "unkown Error",
    });
  }
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const body = await req.json();
    const parsed = GeneticSchema.parse(body);

    const inserted = await createGenetic(parsed);

    return createSuccessResponse<GeneticInsertResult>({
      status: 201,
      data: inserted,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return createValidationErrorResponse({
        details: error,
      });
    }

    const UNKOWN_ERROR_MSG = "Unkown error";
    return createErrorResponse({
      error: "Could not insert into db",
      status: 500,
      msg: error instanceof Error ? error.message : UNKOWN_ERROR_MSG,
      details: error instanceof Error ? error : new Error(UNKOWN_ERROR_MSG),
    });
  }
}
