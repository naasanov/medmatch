import {
  ProfileValidator,
  User,
  UserModel,
  UserService,
  UserValidator,
} from "@/modules/users";
import { File, FileModel, FileService } from "@/modules/files";
import { ID } from "@/types/mongoose";
import {
  IsArray,
  IsDefined,
  IsIn,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from "class-validator";
import { Types } from "mongoose";
import { Type } from "class-transformer";
import MaxBufferSize from "@/utils/maxBufferSize";

// Helper Functions

async function createTestFile(data?: Partial<File>): Promise<File & ID> {
  const defaultFile: File = {
    type: "image/png",
    name: `Test-${Date.now()}`,
    data: Buffer.from("test data"),
  };

  const fileData = {
    ...defaultFile,
    ...data,
  };

  const file = new FileModel(fileData);
  await file.save();
  return file;
}

async function defaultUserData(): Promise<User> {
  const testFile = await createTestFile();
  return {
    first: `Test-${Date.now()}`,
    last: `User-${Date.now()}`,
    email: `test-${Date.now()}@example.com`,
    password: "password123",
    isEmployer: false,
    profile: {
      bio: "Test bio",
      files: [testFile._id],
    },
    entryDate: new Date(),
  };
}

async function createTestUser(data?: Partial<User>): Promise<User & ID> {
  const defaultUser = await defaultUserData();

  const userData = {
    ...defaultUser,
    ...data,
  };

  const user = new UserModel(userData);
  await user.save();
  return user;
}

// Validators

class TestFileValidator {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsIn(["image/jpeg", "image/png", "application/pdf"])
  type!: string;

  @IsNotEmpty()
  @MaxBufferSize(5)
  data!: Buffer;
}

class TestProfileValidator extends ProfileValidator {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TestFileValidator)
  files!: TestFileValidator[];
}

class TestUserValidator extends UserValidator {
  @IsDefined()
  _id!: Types.ObjectId;

  @ValidateNested()
  @Type(() => TestProfileValidator)
  profile!: TestProfileValidator;
}

// Mocks

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

export {
  defaultUserData,
  createTestUser,
  createTestFile,
  TestUserValidator,
  TestProfileValidator,
  TestFileValidator,
  createMockFileService,
  createMockUserService,
};
