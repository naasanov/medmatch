import { IUser } from "@/models/user";
import ProfileService from "@/modules/profiles/profile.service";
import UserService from "@/modules/users/user.service";
import { HandleErrors } from "@/utils/errorHandler";
import { Request, Response } from "express";

class UserController {
  constructor(
    private userService: UserService,
    private profileService: ProfileService
  ) {}

  @HandleErrors()
  async getAllUsers(req: Request, res: Response): Promise<void> {
    const users = await this.userService.getAllUsers();
    res.status(200).json({
      status: "success",
      data: users,
      message: "Users retrieved successfully",
    });
  }

  @HandleErrors()
  async getUserById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const user = await this.userService.getUserById(id);
    res.status(200).json({
      status: "success",
      data: user,
      message: `User with id ${user._id} retrieved successfully`,
    });
  }

  @HandleErrors()
  async createUser(req: Request, res: Response): Promise<void> {
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
  }

  @HandleErrors()
  async updateUser(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const userData: Partial<IUser> = req.body;
    const user = await this.userService.updateUser(id, userData);
    res.status(200).json({
      status: "success",
      data: user,
      message: "User updated successfully",
    });
  }

  @HandleErrors()
  async deleteUser(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const user = await this.userService.deleteUser(id);
    res.status(200).json({
      status: "success",
      data: user,
      message: `User with id ${user._id} deleted successfully`,
    });
  }
}

export default UserController;
