import { ValidationError } from "express-validator";
import { ErrorCode } from "@/types/errorCodes";

interface ApiError {
  details: string;
  code: ErrorCode;
}

interface ResponseBody {
  status: "success" | "error";
}

interface SuccessResponseBody<T = unknown> extends ResponseBody {
  status: "success";
  data: T;
  message: string;
}

interface ErrorResponseBody extends ResponseBody {
  status: "error";
  errors: (ApiError | ValidationError)[];
}

export { ApiError, SuccessResponseBody, ErrorResponseBody, ResponseBody };
