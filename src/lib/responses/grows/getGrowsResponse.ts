import { getGrows, GrowIncludes, toDbError } from "@/lib/data";
import { NextResponse } from "next/server";
import { createResponse } from "../createResponse";

export async function getGrowsResponse(
  includes?: GrowIncludes
): Promise<NextResponse> {
  try {
    const grows = await getGrows(includes);
    return createResponse({
      success: grows.success,
      status: 200,
      data: grows,
    });
  } catch (err) {
    return createResponse({
      status: 500,
      success: false,
      error: toDbError(err),
    });
  }
}
