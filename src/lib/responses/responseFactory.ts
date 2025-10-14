import { NextResponse } from "next/server";
import { ApiResponseData, createResponse } from "./createResponse";
import { DbResult, toDbError, ValidationError } from "../data";
import { z, ZodSchema } from "zod";
import { createResponseFromResult } from "./createResponseFromResult";

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

//extracts the inner type of a data-layer-function
type ExtractDbData<F> = F extends (...args: any[]) => Promise<DbResult<infer T>>
  ? T
  : never;

/**
 * ## ResponseFactory, full inference-chain
 *
 * For this example we look at lib/responses/grows/postGrowResponse:
 * createGrow → Promise<DbResult<GrowWith<Includes>>>
 * ↓
 * ExtractDbData<typeof createGrow> → GrowWith<Includes>
 * ↓
 * ResponseFactory<typeof createGrow> → (...args: Parameters<typeof createGrow>) => NextResponse<ApiResponseData<GrowWith<Includes>>>
 * ↓
 * responseFactory(createGrow) → full auto-typed function
 */

type ResponseFactory<F extends (...args: any[]) => Promise<any>> = ((
  ...args: Parameters<F>
) => Promise<NextResponse<ApiResponseData<ExtractDbData<F>>>>) & {
  withValidation: <Schema extends ZodSchema>(
    schema: Schema
  ) => (
    input: z.input<Schema>
  ) => Promise<NextResponse<ApiResponseData<ExtractDbData<F>>>>;
};

/**
 * ## createFactory(dataHandler)
 * creates a ResponseFactory
 * a function
 * - which takes args and return Promise<NextResponse>
 * - has a withValidation-property
 */
function createFactory<F extends (...args: any[]) => Promise<DbResult<any>>>(
  dataHandler: F
): ResponseFactory<F> {
  const factory = async (
    ...args: Parameters<F>
  ): Promise<NextResponse<ApiResponseData<ExtractDbData<F>>>> => {
    try {
      const result = await dataHandler(...args);
      return createResponseFromResult(result);
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
export function responseFactory<
  F extends (...args: any[]) => Promise<DbResult<any>>,
>(handler: F): ResponseFactory<F> {
  const factory: ResponseFactory<typeof handler> = createFactory(handler);

  /**
   * ✅Adds optional Zod validation support
   * Example usage:
   * export const createGrowResponse =
   *  responseFactory.withValidation(GrowSchema, createGrow)
   */
  factory.withValidation = function <Schema extends ZodSchema>(schema: Schema) {
    return async (
      input: z.input<Schema>
    ): Promise<NextResponse<ApiResponseData<ExtractDbData<F>>>> => {
      const validation = schema.safeParse(input);

      if (!validation.success) {
        return createResponse({
          success: false,
          error: new ValidationError({
            issues: validation.error.issues,
          }),
        });
      }

      const result = await handler(validation.data);
      return createResponseFromResult(result);
    };
  };

  return factory;
}
