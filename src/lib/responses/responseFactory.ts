import { NextResponse } from "next/server";
import { createResponse } from "./createResponse";
import { DbResult, toDbError, ValidationError } from "../data";
import { ZodSchema } from "zod";

/**
 * # ResponseFactories
 *
 * What is a ResponseFactory?
 * => A callable object, which can have a withValidation-property
 *
 * A ResponseFactory binds data-points to a NextResponse-creating
 * function.
 *
 * withValidation is a factory-function itself, that validates data
 * using zod and bind the validated data to a NextResponse-creating
 * function.
 */

type ResponseFactory<Args extends any[], T> = ((
  ...args: Args
) => Promise<NextResponse>) & {
  withValidation: <Input>(
    schema: ZodSchema<Input>,
    validateHandler: (data: Input) => Promise<DbResult<T>>
  ) => (input: unknown) => Promise<NextResponse>;
};

/**
 * ## createFactory(dataHandler)
 * creates a ResponseFactory
 * a function
 * - which takes args and return Promise<NextResponse>
 * - has a withValidation-property
 */
function createFactory<Args extends any[], T>(
  dataHandler: (...args: Args) => Promise<DbResult<T>>
): ResponseFactory<Args, T> {
  const factory = async (...args: Args) => {
    try {
      const result = await dataHandler(...args);
      if (result.success) {
        return createResponse({
          success: true,
          data: result.data,
        });
      } else {
        return createResponse({
          success: false,
          error: result.error,
        });
      }
    } catch (err) {
      return createResponse({
        success: false,
        error: toDbError(err),
      });
    }
  };

  factory.withValidation = () => {
    throw new Error("withValidation not implemented");
  };

  return factory;
}

/**
 * ## responseFactory(handler)
 * returns ResponseFactory with a withValidation-property
 * for the given handler
 */
export function responseFactory<Args extends any[], T>(
  handler: (...args: Args) => Promise<DbResult<T>>
): ResponseFactory<Args, T> {
  const factory = createFactory(handler);

  /**
   * ✅Adds optional Zod validation support
   * Example usage:
   * export const createGrowResponse =
   *  responseFactory.withValidation(GrowSchema, createGrow)
   */
  factory.withValidation = function <Input>(
    schema: ZodSchema<Input>,
    validateHandler: (data: Input) => Promise<DbResult<T>>
  ) {
    return async (input: unknown): Promise<NextResponse> => {
      const finalHandle = createFactory(validateHandler);
      const validation = schema.safeParse(input);

      if (validation.success) {
        return finalHandle(validation.data);
      }

      return createResponse({
        success: false,
        error: new ValidationError({
          issues: validation.error.issues,
        }),
      });
    };
  };

  return factory;
}
