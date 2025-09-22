import { DbError } from "./DbError";
import { UnknownDbError } from "./DbErrors/UnknownDbError";
import { DB_ERROR_REGISTRY } from "./registry";
import { DbErrorOptions } from "./types";

export function toDbError(
  err: unknown,
  options: DbErrorOptions & { code?: string; fallback: DbError } = {
    fallback: new UnknownDbError(),
  }
): DbError {
  if (err instanceof DbError) {
    return err;
  }

  if (options.code && DB_ERROR_REGISTRY[options.code]) {
    const ErrorClass = DB_ERROR_REGISTRY[options.code];
    return new ErrorClass(options);
  }

  if (err instanceof Error) {
    return new UnknownDbError();
  }

  return options.fallback;
}
