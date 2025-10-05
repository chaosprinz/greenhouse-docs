import { ZodIssue } from "zod/v3";
import { DB_ERROR_CODES } from "../DB_ERROR_CODES";
import { DbError } from "../DbError";
import { DbErrorOptions } from "../types";
import { $ZodIssue } from "zod/v4/core";

export class ValidationError extends DbError {
  static code: string = DB_ERROR_CODES.VALIDATION_ERROR;
  code: string = ValidationError.code;
  issues?: $ZodIssue[];

  constructor(options: DbErrorOptions = {}) {
    const message = `Validation failed for ${options.entity ?? "UnknownEntity"}`;
    super(message, options);
    if (options.issues && options.issues.length > 0) {
      this.issues = options.issues;
    }
  }
}
