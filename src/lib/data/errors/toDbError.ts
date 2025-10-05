import { DbError } from "./DbError";
import { UnknownDbError } from "./DbErrors/UnknownDbError";
import { DB_ERROR_REGISTRY } from "./registry";
import { DbErrorOptions } from "./types";

export function toDbError(
  err: unknown,
  {
    code,
    message,
    fallback = new UnknownDbError(),
    ...restOptions
  }: DbErrorOptions & {
    code?: string;
    message?: string;
    fallback?: DbError;
  } = {}
): DbError {
  if (err instanceof DbError) {
    return err;
  }

  if (code && DB_ERROR_REGISTRY[code]) {
    const ErrorClass = DB_ERROR_REGISTRY[code] as new (
      message?: string,
      options?: DbErrorOptions
    ) => DbError;

    // ✅ Use undefined for message if none given so subclass default kicks in
    return new ErrorClass(message, restOptions);
  }

  if (err instanceof Error) {
    return new UnknownDbError(err.message, restOptions);
  }

  return fallback;
}
