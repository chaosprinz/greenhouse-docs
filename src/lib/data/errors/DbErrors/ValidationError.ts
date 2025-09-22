import { DB_ERROR_CODES } from "../DB_ERROR_CODES";
import { DbError } from "../DbError";
import { DbErrorOptions } from "../types";

export class ValidationError extends DbError {
  static code = DB_ERROR_CODES.VALIDATION_ERROR;
  code = ValidationError.code;

  constructor(options: DbErrorOptions = {}) {
    const message = `Validation failed for ${options.entity ?? "UnknownEntity"}.${options.field ?? "NoField"}`;
    super(message, options);
  }
}
