import Router from "express";
import { User } from "@/models/user";
import { Profile } from "@/models/profile";
import UserService from "@/users/userService";
import ProfileService from "@/profiles/profileService";
import UserController from "@/users/userController";

const router = Router();
const userService = new UserService(User);
const profileService = new ProfileService(Profile);
const userController = new UserController(userService, profileService);

router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.post("/", userController.createUser);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

export default router;