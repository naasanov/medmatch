import { IUser } from "@/models/user";
import ProfileService from "@/profiles/profileService";
import UserService from "@/users/userService";
import asyncHandler from "express-async-handler";

class UserController {
  constructor(
    private userService: UserService,
    private profileService: ProfileService
  ) {}

  getAllUsers = asyncHandler(async (req, res): Promise<any> => {
    const users = await this.userService.getAllUsers();
    res.status(200).json({
      status: "success",
      data: users,
      message: "Users retrieved successfully",
    });
  });

  getUserById = asyncHandler(async (req, res): Promise<any> => {
    const { id } = req.params;
    const user = await this.userService.getUserById(id);
    res.status(200).json({
      status: "success",
      data: user,
      message: `User with id ${user._id} retrieved successfully`,
    });
  });

  createUser = asyncHandler(async (req, res): Promise<any> => {
    const userData: IUser = req.body;
    const profile = await this.profileService.createProfile();
    const user = await this.userService.createUser({
      ...userData,
      profile: profile._id,
    });
    res.status(201).json({
      status: "success",
      data: user,
      message: `User with id ${user._id} created successfully`,
    });
  });

  updateUser = asyncHandler(async (req, res): Promise<any> => {
    const { id } = req.params;
    const userData: Partial<IUser> = req.body;
    const user = await this.userService.updateUser(id, userData);
    res.status(200).json({
      status: "success",
      data: user,
      message: "User updated successfully",
    });
  });

  deleteUser = asyncHandler(async (req, res): Promise<any> => {
    const { id } = req.params;
    const user = await this.userService.deleteUser(id);
    res.status(200).json({
      status: "success",
      data: user,
      message: `User with id ${user._id} deleted successfully`,
    });
  });
}

export default UserController;
