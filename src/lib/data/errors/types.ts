import { $ZodIssue } from "zod/v4/core";

export type DbErrorOptions = {
  entity?: string;
  id?: number | string;
  issues?: $ZodIssue[];
};

export type errorData = {
  name: string;
  code: string;
  message: string;
  timestamp: number;
  entity?: string;
  id?: number | string;
  field?: string;
  issues?: $ZodIssue[];
};
