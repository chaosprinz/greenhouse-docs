import { number, ZodError } from "zod";
import { NextResponse } from "next/server";
import { createResponse, ApiResponseData } from "./createResponse";
import { ZodIssue } from "zod/v3";

type Props = {
  details: ZodError;
  msg?: string;
};

type FormattedError = {
  field: string;
  path: (string | number)[];
  message: string;
};

export function createValidationErrorResponse({
  details,
  msg,
}: Props): NextResponse<ApiResponseData<FormattedError[]>> {
  const formattedErrors: FormattedError[] = details.issues.map((issue) => {
    const path = issue.path.filter(
      (p): p is string | number =>
        typeof p === "string" || typeof p === "number"
    );
    const field = path.join(".");
    return {
      field,
      path,
      message: issue.message,
    };
  });
  return createResponse<FormattedError[]>({
    success: false,
    error: "Validation failed",
    status: 400,
    msg: msg ?? "Unknown validation error",
    details: formattedErrors,
  });
}
