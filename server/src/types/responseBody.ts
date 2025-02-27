import { ValidationError } from "express-validator";
import { ApiError } from "@/types/errors";

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

export { SuccessResponseBody, ErrorResponseBody, ResponseBody };
