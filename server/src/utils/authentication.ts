import { GeneralCode } from "@/types/errorCodes";
import { NextFunction, Request, Response } from "express";
import { getToken } from "next-auth/jwt";

/**
 * Middleware that authenticates a user based on their NextAuth token.
 * If the token is not present, it sends a 401 Unauthorized response.
 */
async function authenticate(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> {
  console.log("Authenticating user...");
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });
  console.log("Token:", token);
  if (!token) {
    return res.status(401).json({
      status: "error",
      errors: [
        {
          type: "http",
          details: "Unauthorized",
          code: GeneralCode.Unauthorized,
        },
      ],
    });
  }
  next();
}

export { authenticate };
