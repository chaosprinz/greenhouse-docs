export type DbErrorOptions = {
  entity?: string;
  id?: number | string;
  field?: string;
};

export type errorData = {
  name: string;
  code: string;
  message: string;
  timestamp: number;
  entity?: string;
  id?: number | string;
  field?: string;
};
