import { UserService } from "@/modules/users";
import { FileService } from "@/modules/files";

const createMockFileService = () => {
  const fileService = {} as jest.Mocked<FileService>;
  fileService.getAllFiles = jest.fn();
  fileService.getFileById = jest.fn();
  fileService.createFile = jest.fn();
  fileService.deleteFile = jest.fn();
  return fileService;
};

const createMockUserService = () => {
  const userService = {} as jest.Mocked<UserService>;
  userService.getAllUsers = jest.fn();
  userService.getUserById = jest.fn();
  userService.createUser = jest.fn();
  userService.updateUser = jest.fn();
  userService.deleteUser = jest.fn();
  userService.addFile = jest.fn();
  userService.removeFile = jest.fn();
  return userService;
};

export { createMockFileService, createMockUserService };
