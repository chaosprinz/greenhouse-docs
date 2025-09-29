import { NextResponse } from "next/server";
import { DbError } from "../data";
import { errorData } from "../data/errors/types";

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
};

export type ResponseProps<T = unknown> = {
  success: boolean;
  status: number;
  timestamp?: number;
  data?: T;
  details?: T;
  msg?: string;
  error?: errorData;
};

export function createResponse<T>({
  success,
  status,
  data,
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

  if (error) {
    responseData.error = error;
  }

  return NextResponse.json(responseData, { status });
}
