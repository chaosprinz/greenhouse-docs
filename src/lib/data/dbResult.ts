import { errorData } from "./errors/types";
import { DbResult } from "./types";

/**
 * ## dbResult
 *
 * Utility to wrap database-result into a uniform DbResult<T>
 * Handles both, success and error cases, with full generic inference.
 */

// ✅ Overload for success
export function dbResult<T>(
  success: true,
  data: T
): Extract<DbResult<T>, { success: true }>;

// ✅ Overload for error
export function dbResult<T>(
  success: false,
  error: errorData
): Extract<DbResult<T>, { success: false }>;

// ✅ Implementation
export function dbResult<T>(
  success: boolean,
  value: T | errorData
): DbResult<T> {
  if (success) {
    return {
      success: true,
      type: "ok",
      data: value as T,
    };
  } else {
    return {
      success: false,
      type: "error",
      error: value as errorData,
    };
  }
}

/**
 * ## dbResultFactory<T>
 * returns a function for creating DbResult<T>
 */
export function dbResultFactory<T>() {
  return dbResult<T>;
}
