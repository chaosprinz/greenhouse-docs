import { NextResponse } from "next/server";
import { errorData } from "../data/errors/types";
import { $ZodIssue } from "zod/v4/core";

export type ApiResponseData<T = unknown> = {
  success: boolean;
  status: number;
  timestamp: number;

  //success: true
  data?: T; //payload

  //success: false
  error?: errorData;
  msg?: string;
  details?: T;
  issues?: $ZodIssue[];
};

export type ResponseProps<T = unknown> = {
  success: boolean;
  data?: T;
  error?: errorData;
  issues?: $ZodIssue[];
  timestamp?: number;
};

export function createResponse<T = unknown>({
  success,
  data,
  error,
  issues,
  timestamp,
}: ResponseProps<T>): NextResponse<ApiResponseData<T>> {
  const status: number = success ? 200 : 500;
  const responseData: ApiResponseData<T> = {
    success,
    status,
    timestamp: timestamp ? timestamp : Date.now(),
    ...(issues && { issues }),
    ...(data && { data }),
    ...(error && { error }),
  };

  return NextResponse.json(responseData, { status });
}
