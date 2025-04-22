import { Request, Response, NextFunction } from "express";
import { HttpError } from "@/types/errors";
import { GeneralCode } from "@/types/errorCodes";
import dotenv from "dotenv";
dotenv.config();

const errorHandler = (error: any, req: Request, res: Response, next: NextFunction): any => {
  if (process.env.NODE_ENV === "development") {
    console.error(error);
  }

  if (res === undefined) {
    console.error("Response object is undefined in errorHandler");
    return;
  }

  if (error instanceof HttpError) {
    return res.status(error.status).json({
      status: "error",
      errors: [
        {
          type: error.type,
          details: error.message,
          code: error.code,
        },
      ],
    });
  } else {
    return res.status(500).json({
      status: "error",
      errors: [
        {
          type: "http",
          details: "Internal server error",
          code: GeneralCode.InternalServerError,
        },
      ],
    });
  }
};

/**
 * Decorator that passes any caught error to the error handler.
 * The error handler will convert any caught `HttpError` to a JSON response and log the error in development.
 * Any other error will be converted to a generic 500 error.
 */
function HandleErrors() {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;

    if (typeof originalMethod !== "function") {
      throw new Error(`@HandleErrors can only be applied to methods.`);
    }

    descriptor.value = async function (
      this: any,
      req: Request,
      res: Response,
      next: NextFunction
    ) {
      try {
        await originalMethod.apply(this, [req, res, next]);
      } catch (error) {
        next(error);
      }
    };
  };
}

export { errorHandler, HandleErrors };
