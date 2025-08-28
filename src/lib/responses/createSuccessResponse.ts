import { NextResponse } from "next/server";
import {
  createResponse,
  ApiResponseData,
  ResponseProps,
} from "./createResponse";

type SuccessResponseProps<T> = {
  data: T;
  status: number;
};

export function createSuccessResponse<T = unknown>({
  data,
  status,
}: SuccessResponseProps<T>): NextResponse<ApiResponseData<T>> {
  const body: ResponseProps<T> = {
    success: true,
    status,
    data,
  };
  return createResponse<T>(body);
}
