import { UserModel, UserService, UserValidator } from "@/modules/users";
import { AuthService, AuthController, CredentialsValidator } from "@/modules/auth";
import { Router } from "express";
import { validateBody, validation } from "@/utils/validationMiddleware";
import { cookie } from "express-validator";

const authRouter = Router();
const userService = new UserService(UserModel);
const authService = new AuthService(userService);
const authController = new AuthController(authService);

authRouter.post(
  "/login",
  validation(validateBody(CredentialsValidator)),
  authController.login
);

authRouter.post(
  "/signup",
  validation(validateBody(UserValidator)),
  authController.signup
)

authRouter.post("/logout", authController.logout);

authRouter.post(
  "/token",
  validation(
    cookie("refreshToken")
      .exists({ checkFalsy: true }) // checkFalsy: true will return an error for empty strings
      .withMessage("Undefined or empty 'refreshToken' cookie")
  ),
  authController.generateAccessToken
);

export { authRouter };
