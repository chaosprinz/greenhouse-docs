import z from "zod";
import { DB_ERROR_CODES, toDbError, ValidationError } from "./errors";

export function validateInputFor<T extends z.ZodObject<any>>(
  schema: T,
  input: unknown,
  entity: string
): z.infer<T> {
  try {
    const validInput = schema.parse(input);
    return validInput;
  } catch (err) {
    if (err instanceof z.ZodError) {
      const error = new ValidationError({
        entity,
        issues: err.issues,
      });
      throw error;
    }
    throw toDbError(err, {
      code: DB_ERROR_CODES.UNKNOWN_VALIDATION_ERROR,
    });
  }
}
