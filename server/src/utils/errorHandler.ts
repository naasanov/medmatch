import { Request, Response } from "express";
import { CustomError } from "@/types/errors";
import { GeneralCode } from "@/types/errorCodes";
import dotenv from "dotenv";
dotenv.config();

const errorHandler = (
  err: any,
  req: Request,
  res: Response,
): any => {
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

export default errorHandler;
