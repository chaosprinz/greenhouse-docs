import { DbError, toDbError } from "./errors";
import { DbResult } from "./types";

export function dbResult<T>(success: true, data: T): DbResult<T>;
export function dbResult<T>(success: false, error: Error): DbResult<T>;
export function dbResult<T>(success: boolean, value: T | DbError): DbResult<T> {
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
      error: toDbError(value),
    };
  }
}

export function dbResultFactory<T>() {
  return dbResult<T>;
}
