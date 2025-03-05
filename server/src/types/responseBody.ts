import { ErrorCode } from "@/types/errorCodes";
import { Location } from "express-validator";

interface ApiError {
  type: "data";
  details: string;
  code: ErrorCode;
}

interface ValidationError {
  type: "validation";
  loc: Location | "other";
  field: string;
  details: string;
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

export {
  ApiError,
  ValidationError,
  SuccessResponseBody,
  ErrorResponseBody,
  ResponseBody,
};
