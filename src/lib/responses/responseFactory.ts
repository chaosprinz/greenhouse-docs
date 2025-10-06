import { NextResponse } from "next/server";
import { createResponse } from "./createResponse";
import { DbResult, toDbError } from "../data";

export function responseFactory<Args extends any[], T>(
  handler: (...args: Args) => Promise<DbResult<T>>
) {
  const factory = async (...args: Args): Promise<NextResponse> => {
    try {
      const result = await handler(...args);

      if (result.success) {
        // ✅ unwrap data for success case
        return createResponse({
          success: true,
          data: result.data,
        });
      } else {
        // ❌ handled error-case result
        return createResponse({
          success: false,
          error: result.error,
        });
      }
    } catch (err) {
      // ⚠️ unexpected exception (not a DbResult)
      return createResponse({
        success: false,
        error: toDbError(err as Error),
      });
    }
  };

  return factory;
}
