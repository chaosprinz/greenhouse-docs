import { DB_ERROR_CODES } from "../DB_ERROR_CODES";
import { DbError } from "../DbError";
import { DbErrorOptions } from "../types";

export class NotFoundError extends DbError {
  static code = DB_ERROR_CODES.NOT_FOUND;
  code = NotFoundError.code;

  constructor(options: DbErrorOptions = {}) {
    const entity = options.entity ?? "Unknown entity";
    const id = options.id ?? "NO_ID";
    super(`${entity} with id ${id} not found`, { entity, id });
  }
}
