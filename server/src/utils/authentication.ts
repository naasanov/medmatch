import { UnauthorizedError } from "@/types/errors";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

/**
 * Middleware to authenticate the user using JWT.
 * It checks for the presence of an authorization header,
 * verifies the token, and adds the user email and id to `res.locals.user`.
 * Moves to the next middleware if authentication is successful.
 * @throws An {@link UnauthorizedError} if the token is missing, invalid, or has an invalid payload shape.
 */
async function authenticate(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> {
  try {
    console.log("Authenticating request...");
    const { authorization } = req.headers;
    console.log("Authorization header:", authorization);

    if (!authorization) {
      console.log("No authorization header provided");
      throw new UnauthorizedError("No authorization header provided");
    }

    // Extract token from "Bearer <token>" format
    const token = authorization.split(" ")[1];
    console.log("Extracted token:", token);

    if (token === undefined) {
      console.log("No token provided");
      throw new UnauthorizedError("No token provided");
    }

    let decoded: any;
    try {
      decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!);
      console.log("Decoded token:", decoded);
    } catch (error) {
      console.log("Token verification failed:", error);
      throw new UnauthorizedError("Unauthorized token");
    }

    if (
      !decoded ||
      typeof decoded !== "object" ||
      typeof decoded.email !== "string" ||
      typeof decoded.id !== "string"
    ) {
      console.log("Invalid payload shape:", decoded);
      throw new UnauthorizedError("Invalid payload shape");
    }

    res.locals.user = {
      email: decoded.email,
      id: decoded.id,
    };
    console.log("User set in res.locals:", res.locals.user);
    next();
  } catch (error) {
    next(error);
  }
}

export { authenticate };
