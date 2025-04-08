import { ErrorCode } from "@/types/errorCodes";

interface ApiError {
  type: "http" | "validation";
  details: string;
}

interface HttpError extends ApiError {
  type: "http";
  code: ErrorCode;
}

interface ValidationError extends ApiError {
  type: "validation";
  loc: "body" | "cookies" | "headers" | "params" | "query" | "other";
  field: string;
}

interface SuccessResponse<T = unknown> {
  status: "success";
  data: T;
  message: string;
}

interface ErrorResponse {
  status: "error";
  errors: ApiError[];
}

type ResponseBody<T = unknown> = SuccessResponse<T> | ErrorResponse;

export type {
  SuccessResponse,
  ErrorResponse,
  ResponseBody,
  ApiError,
  HttpError,
  ValidationError,
};
