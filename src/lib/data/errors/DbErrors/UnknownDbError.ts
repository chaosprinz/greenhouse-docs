import { DB_ERROR_CODES } from "../DB_ERROR_CODES";
import { DbError } from "../DbError";
import { DbErrorOptions } from "../types";

export class UnknownDbError extends DbError {
  static code = DB_ERROR_CODES.UNKNOWN_DB_ERROR;
  code = UnknownDbError.code;

  constructor(
    message = "Unknown Database Error",
    options: DbErrorOptions = {}
  ) {
    super(message, options);
  }
}
