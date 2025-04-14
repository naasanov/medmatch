import { ErrorCode } from "@/types/errorCodes";

/**
 * Discriminated type union for an error in an {@link ErrorResponse}.
 * type: "http" indicates an {@link HttpError}, while type: "validation" indicates a {@link ValidationError}.
 */
interface ApiError {
  type: "http" | "validation";
  details: string;
}

/**
 * Structure for an error that occurs during the logic of an HTTP request.
 * One of the unioned types for the {@link ApiError} interface.
 */
interface HttpError extends ApiError {
  type: "http";
  code: ErrorCode;
}

/**
 * Structure for an error that occurs during the input validation of an HTTP request.
 * One of the unioned types for the {@link ApiError} interface.
 */
interface ValidationError extends ApiError {
  type: "validation";
  loc: "body" | "cookies" | "headers" | "params" | "query" | "other";
  field: string;
}

/**
 * Structure for the body of a successful HTTP response from the backend.
 * The generic type `T` is used to specify the type of the data returned in the response.
 * One of the unioned types for the {@link ResponseBody} interface.
 */
interface SuccessResponse<T = unknown> {
  status: "success";
  data: T;
  message: string;
}

/**
 * Structure for the body of an error HTTP response from the backend.
 * One of the unioned types for the {@link ResponseBody} interface.
 */
interface ErrorResponse {
  status: "error";
  errors: ApiError[];
}

/**
 * A discriminiated type union that represents the body of an HTTP response from the backend.  
 * 
 * The `status` field is used to determine the type of the response, 
 * either "success" for {@link SuccessResponse} or "error" for {@link ErrorResponse}.  
 * 
 * For proper type inference, use the {@link isSuccess} and {@link isError} type predicates to check the response type.
 *   
 * The generic type `T` is used to specify the type of the data returned in the response, given that it is a success.
 */
type ResponseBody<T = unknown> = SuccessResponse<T> | ErrorResponse;

/**
 * Type predicate that checks if the response body is a success response.
 */
function isSuccess<T>(body: ResponseBody<T>): body is SuccessResponse<T> {
  return body.status === "success";
}

/**
 * Type predicate that checks if the response body is a error response.
 */
function isError<T>(body: ResponseBody<T>): body is ErrorResponse {
  return body.status === "error";
}

export type {
  SuccessResponse,
  ErrorResponse,
  ResponseBody,
  ApiError,
  HttpError,
  ValidationError,
};

export {
  isSuccess,
  isError,
}
