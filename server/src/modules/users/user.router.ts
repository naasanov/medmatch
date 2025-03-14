import Router from "express";
import {
  UserService,
  UserController,
  UserValidator,
  UserModel,
} from "@/modules/users";
import { FileModel, FileService, FileValidator } from "@/modules/files";
import {
  validation,
  validateBody,
  validatePartialBody,
  validateId,
  validateFile,
} from "@/utils/validationMiddleware";
import multer from "multer";

const userRouter = Router();
const userService = new UserService(UserModel);
const fileService = new FileService(FileModel);
const userController = new UserController(userService, fileService);
const upload = multer();

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

userRouter.patch(
  "/:id",
  validation(validatePartialBody(UserValidator), validateId("id")),
  userController.updateUser
);

userRouter.delete(
  "/:id",
  validation(validateId("id")),
  userController.deleteUser
);

userRouter.post(
  "/:id/files",
  upload.single("file"),
  validation(validateId("id"), validateFile(FileValidator)),
  userController.addFile
);

export { userRouter };
