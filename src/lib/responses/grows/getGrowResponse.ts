import {
  DbError,
  getGrow,
  Grow,
  GrowIncludes,
  Grows,
  toDbError,
} from "@/lib/data";
import { NextResponse } from "next/server";
import { createResponse } from "../createResponse";

export async function getGrowResponse(
  id: number,
  includes?: GrowIncludes
): Promise<NextResponse> {
  try {
    const grow = await getGrow(id, includes);
    return createResponse<Grow>({
      status: 200,
      success: true,
      data: grow,
    });
  } catch (err) {
    return createResponse<DbError>({
      success: false,
      status: 500,
      error: toDbError(err),
    });
  }
}
