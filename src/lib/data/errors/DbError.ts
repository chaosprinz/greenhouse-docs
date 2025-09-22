import { DbErrorOptions, errorData } from "./types";

/**
 * ### DbError: base error-class
 *
 * meant to be used for creating nnew DbError-classes
 * and not for creating actual errors
 */

export abstract class DbError extends Error {
  abstract code: string;
  timestamp: number;
  entity?: string;
  id?: number | string;
  field?: string;

  constructor(message: string, options: DbErrorOptions) {
    super(message);
    this.name = this.constructor.name; // Gives "NotFoundError", "UnknownDBError" etc.
    this.timestamp = Date.now();
    this.entity = options.entity;
    this.id = options.id;
    this.field = options.field;
  }

  toJSON(): errorData {
    return {
      name: this.name,
      code: this.code,
      message: this.message,
      timestamp: this.timestamp,
      entity: this.entity,
      id: this.id,
      field: this.field,
    } as errorData;
  }
}
