import { DB_ERROR_CODES } from "../DB_ERROR_CODES";
import { DbError } from "../DbError";
import { DbErrorOptions } from "../types";

export class UnknownValidationError extends DbError {
  static code = DB_ERROR_CODES.UNKNOWN_VALIDATION_ERROR;
  code = UnknownValidationError.code;

  constructor(message = "", options: DbErrorOptions = {}) {
    if (!message || message === "") {
      message = `Unknown Validation-error when validating ${options.entity ?? "UnknownEntity"}`;
    }
    super(message, options);
  }
}
