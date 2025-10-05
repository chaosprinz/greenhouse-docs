import { errorData } from "./errors/types";
import { DbResult } from "./types";

export function dbResult<T>(success: true, data: T): DbResult<T>;
export function dbResult<T>(success: false, error: errorData): DbResult<T>;
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

export function dbResultFactory<T>() {
  return dbResult<T>;
}
