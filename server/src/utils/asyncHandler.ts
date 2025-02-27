import { Request, Response, NextFunction } from "express";
import { GeneralCode } from "@/types/errors";

const asyncHandler = (fn: Function) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      res.status(500).json({ 
        status: "error",
        errors: [
          {
            details: "Internal server error",
            code: GeneralCode.InternalServerError
          }
        ]
       });
    }
  };
};

export default asyncHandler;