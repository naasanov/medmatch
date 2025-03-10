import Router from "express";
import {
  UserService,
  UserController,
  UserValidator,
  UserModel,
} from "@/modules/users";
import { ProfileService, ProfileModel } from "@/modules/profiles";
import {
  validation,
  validateBody,
  validatePartialBody,
  validateId,
} from "@/utils/validationMiddleware";

const userRouter = Router();
const userService = new UserService(UserModel);
const profileService = new ProfileService(ProfileModel);
const userController = new UserController(userService, profileService);

userRouter.get("/", userController.getAllUsers);

userRouter.get(
  "/:id",
  validation(validateId("id")),
  userController.getUserById
);

userRouter.post(
  "/",
  validation(validateBody(UserValidator)),
  userController.createUser
);

userRouter.put(
  "/:id",
  validation(validatePartialBody(UserValidator), validateId("id")),
  userController.updateUser
);

userRouter.delete(
  "/:id",
  validation(validateId("id")),
  userController.deleteUser
);

export { userRouter };
