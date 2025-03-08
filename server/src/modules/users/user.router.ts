import Router from "express";
import { UserModel } from "@/models/user";
import { ProfileModel } from "@/models/profile";
import UserService from "@/modules/users/user.service";
import ProfileService from "@/modules/profiles/profile.service";
import UserController from "@/modules/users/user.controller";
import {
  validation,
  validateBody,
  validatePartialBody,
  validateId,
} from "@/utils/validationMiddleware";
import { UserValidator } from "@/models/user";

const router = Router();
const userService = new UserService(UserModel);
const profileService = new ProfileService(ProfileModel);
const userController = new UserController(userService, profileService);

router.get("/", userController.getAllUsers);

router.get("/:id", validation(validateId("id")), userController.getUserById);

router.post(
  "/",
  validation(validateBody(UserValidator)),
  userController.createUser
);

router.put(
  "/:id",
  validation(validatePartialBody(UserValidator), validateId("id")),
  userController.updateUser
);

router.delete("/:id", validation(validateId("id")), userController.deleteUser);

export default router;
