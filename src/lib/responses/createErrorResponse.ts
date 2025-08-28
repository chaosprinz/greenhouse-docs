import { NextResponse } from "next/server";
import {
  ApiResponseData,
  createResponse,
  ResponseProps,
} from "./createResponse";

type ErrorResponseProps<T> = {
  error: string;
  status?: number;
  msg?: string;
  details?: T | Error;
};

/**
 * ## createErrorResponse(props) => NextResponse<ApiError>
 * - creates a consistent error response
 * @param props: props
 * @returns NextResponse<ApiResponseData>
 */
export function createErrorResponse<T = Error>({
  error,
  status,
  msg,
  details,
}: ErrorResponseProps<T>): NextResponse<ApiResponseData<T | Error>> {
  const body: ResponseProps<T | Error> = {
    success: false,
    error,
    status: status || 500,
    msg,
  };

  const UNKNOWN_ERROR_MSG = "Unknown Error";

  // set details if we get some
  if (details !== undefined) {
    body.details = details;
  } else if (error) {
    body.details = new Error(UNKNOWN_ERROR_MSG);
  }
  // if no msg, but an error is given, set msg to details.message (if its an Error)
  // or to UNKOWN_ERROR_MSG otherwise
  if (!msg && error) {
    body.msg = details instanceof Error ? details.message : UNKNOWN_ERROR_MSG;
  }

  return createResponse<T | Error>(body);
}
