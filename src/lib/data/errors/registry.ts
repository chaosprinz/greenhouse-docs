import { DB_ERROR_CODES } from "./DB_ERROR_CODES";
import { DbError } from "./DbError";
import { NotFoundError } from "./DbErrors/NotFoundError";
import { UnknownDbError } from "./DbErrors/UnknownDbError";
import { UnknownValidationError } from "./DbErrors/UnknownValidationError";
import { ValidationError } from "./DbErrors/ValidationError";

export const DB_ERROR_REGISTRY: Record<
  string,
  new (...args: any[]) => DbError
> = {
  [DB_ERROR_CODES.UNKNOWN_DB_ERROR]: UnknownDbError,
  [DB_ERROR_CODES.NOT_FOUND]: NotFoundError,
  [DB_ERROR_CODES.VALIDATION_ERROR]: ValidationError,
  [DB_ERROR_CODES.UNKNOWN_VALIDATION_ERROR]: UnknownValidationError,
};
