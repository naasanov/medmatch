import { UserService, User } from "@/modules/users";
import { HandleErrors } from "@/utils/errorHandler";
import { Request, Response } from "express";
import { FileService, File } from "@/modules/files";

class UserController {
  constructor(
    private userService: UserService,
    private fileService: FileService
  ) {
    this.getAllUsers = this.getAllUsers.bind(this);
    this.getUserById = this.getUserById.bind(this);
    this.createUser = this.createUser.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
    this.addFile = this.addFile.bind(this);
    this.removeFile = this.removeFile.bind(this);
  }

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
    const userData: User = req.body;
    const user = await this.userService.createUser(userData);
    res.status(201).json({
      status: "success",
      data: user,
      message: `User with id ${user._id} created successfully`,
    });
  }

  @HandleErrors()
  async updateUser(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const userData = req.body;
    const user = await this.userService.updateUser(id, userData);
    res.status(200).json({
      status: "success",
      data: user,
      message: `User with id ${user._id} updated successfully`,
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

  @HandleErrors()
  async addFile(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const fileData = req.file!;
    const file = await this.fileService.createFile({
      name: fileData.originalname,
      type: fileData.mimetype,
      data: fileData.buffer,
    } as File);
    const user = await this.userService.addFile(id, file._id.toString());
    res.status(200).json({
      status: "success",
      data: user,
      message: `File ${file.name} with id ${file._id} successfully added to user with id ${user._id}`,
    });
  }

  @HandleErrors()
  async removeFile(req: Request, res: Response): Promise<void> {
    const { userId, fileId } = req.params;
    await this.fileService.deleteFile(fileId);
    const user = await this.userService.removeFile(userId, fileId);
    res.status(200).json({
      status: "success",
      data: user,
      message: "File removed successfully",
    });
  }
}

export { UserController };
