import { createGrow, GrowIncludes, GrowInput, toDbError } from "@/lib/data";
import { NextResponse } from "next/server";
import { createResponse } from "../createResponse";

export async function postGrowResponse(
  growData: GrowInput
): Promise<NextResponse> {
  try {
    const newGrow = await createGrow(growData);

    return createResponse({
      success: newGrow.success,
      status: 200,
      data: newGrow,
    });
  } catch (err) {
    return createResponse({
      success: false,
      status: 500,
      error: toDbError(err).toJSON(),
    });
  }
}
