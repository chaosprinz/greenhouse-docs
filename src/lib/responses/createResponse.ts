import { NextResponse } from "next/server";

export type ApiResponseData<T = unknown> = {
  success: boolean;
  status: number;
  timestamp: number;

  //success: true
  data?: T;

  //success: false
  error?: string;
  msg?: string;
  details?: T;
};

export type ResponseProps<T = unknown> = {
  success: boolean;
  status: number;
  timestamp?: number;
  data?: T;
  details?: T;
  msg?: string;
  error?: string;
};

export function createResponse<T>({
  success,
  status,
  data,
  details,
  msg,
  error,
  timestamp,
}: ResponseProps<T>): NextResponse<ApiResponseData<T>> {
  const responseData: ApiResponseData<T> = {
    success,
    status,
    timestamp: timestamp ? timestamp : Date.now(),
  };

  if (data) {
    responseData.data = data;
  }

  if (details) {
    responseData.details = details;
  }
  if (error) {
    responseData.error = error;
  }
  if (msg) {
    responseData.msg = msg;
  }

  return NextResponse.json(responseData, { status });
}
