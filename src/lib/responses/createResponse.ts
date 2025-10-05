import { NextResponse } from "next/server";
import { errorData } from "../data/errors/types";
import { $ZodIssue } from "zod/v4/core";

export type ApiResponseData<T = unknown> = {
  success: boolean;
  status: number;
  timestamp: number;

  //success: true
  data?: T;

  //success: false
  error?: errorData;
  msg?: string;
  details?: T;
  issues?: $ZodIssue[];
};

export type ResponseProps<T = unknown> = {
  success: boolean;
  status: number;
  timestamp?: number;
  data?: T;
  details?: T;
  msg?: string;
  error?: errorData;
  issues?: $ZodIssue[];
};

export function createResponse<T>({
  success,
  status,
  data,
  error,
  issues,
  timestamp,
}: ResponseProps<T>): NextResponse<ApiResponseData<T>> {
  const responseData: ApiResponseData<T> = {
    success,
    status,
    issues: issues ?? undefined,
    timestamp: timestamp ? timestamp : Date.now(),
  };

  if (data) {
    responseData.data = data;
  }

  if (error) {
    responseData.error = error;
  }

  if (issues) {
    responseData.issues = issues;
  }
  return NextResponse.json(responseData, { status });
}
