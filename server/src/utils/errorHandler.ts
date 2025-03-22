import { Request, Response, RequestHandler, NextFunction } from "express";
import { HttpError } from "@/types/errors";
import { GeneralCode } from "@/types/errorCodes";
import dotenv from "dotenv";
dotenv.config();

const errorHandler = (err: any, req: Request, res: Response): any => {
  if (process.env.NODE_ENV === "development") {
    console.error(err);
  }

  if (err instanceof HttpError) {
    return res.status(err.status).json({
      status: "error",
      errors: [
        {
          type: err.type,
          details: err.message,
          code: err.code,
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
        console.log(error)
        next(error);
      }
    };
  };
}

export { errorHandler, HandleErrors };
