import { CredentialsValidator, UserModel, UserService } from "@/modules/users";
import { AuthService, AuthController } from "@/modules/auth";
import { Router } from "express";
import { validateBody, validation } from "@/utils/validationMiddleware";

const authRouter = Router();
const userService = new UserService(UserModel);
const authService = new AuthService(userService);
const authController = new AuthController(authService);

authRouter.post(
  "/login",
  validation(validateBody(CredentialsValidator)),
  authController.login
);

export { authRouter };
