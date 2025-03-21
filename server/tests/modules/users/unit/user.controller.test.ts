import { UserController, UserService } from "@/modules/users";
import { FileService } from "@/modules/files";
import {
  createMockUserService,
  createMockFileService,
} from "#/modules/users/user.utils";
import { createMockRequest, createMockResponse } from "#/utils/express.mocks";
import { Request, Response } from "express";

describe("UserController", () => {
  let userService: jest.Mocked<UserService>;
  let fileService: jest.Mocked<FileService>;
  let userController: UserController;
  let req: jest.Mocked<Request>;
  let res: jest.Mocked<Response>;

  beforeEach(() => {
    jest.clearAllMocks();

    userService = createMockUserService();
    fileService = createMockFileService();
    userController = new UserController(userService, fileService);

    req = createMockRequest();
    res = createMockResponse();
  });
});
