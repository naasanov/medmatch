import { Request, Response } from "express";
import { CustomError } from "@/types/errors";
import { GeneralCode } from "@/types/errorCodes";
import asyncHandler from "express-async-handler";
import dotenv from "dotenv";
dotenv.config();

const errorHandler = (err: any, req: Request, res: Response): any => {
  if (process.env.NODE_ENV === "development") {
    console.error(err);
  }

  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({
      status: "error",
      errors: [
        {
          details: err.message,
          code: err.errorCode,
        },
      ],
    });
  } else {
    return res.status(500).json({
      status: "error",
      errors: [
        {
          details: "Internal server error",
          code: GeneralCode.InternalServerError,
        },
      ],
    });
  }
};

/**
 * Decorator that passes any caught error to the error handler
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

    descriptor.value = asyncHandler(originalMethod);
  };
}

export { errorHandler, HandleErrors };
