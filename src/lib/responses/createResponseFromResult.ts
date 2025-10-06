import { NextResponse } from "next/server";
import { DbResult } from "../data";
import { ApiResponseData, createResponse } from "./createResponse";

export function createResponseFromResult<T>(
  result: DbResult<T>
): NextResponse<ApiResponseData<T>> {
  if (result.success) {
    return createResponse({
      success: true,
      data: result.data,
    });
  }

  return createResponse({
    success: false,
    error: result.error,
  });
}
