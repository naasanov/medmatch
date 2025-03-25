import "reflect-metadata";
import {
  UserService,
  UserModel,
  UserNotFoundError,
  UserConflictError,
} from "@/modules/users";
import {
  createTestFile,
  createTestUser,
  defaultUserData,
  TestUserValidator,
} from "#/modules/users/user.utils";
import { expectMatch } from "#/utils/validation";
import { ObjectId } from "mongodb";
import { FileConflictError, FileNotFoundError } from "@/modules/files";

describe("User Service", () => {
  let userService: UserService;

  beforeEach(() => {
    userService = new UserService(UserModel);
  });

  describe("getAllUsers", () => {
    it("should return an empty array for an empty database", async () => {
      const users = await userService.getAllUsers();
      expect(users).toEqual([]);
    });

    it("should return all users in the database", async () => {
      const user1 = await createTestUser();
      const user2 = await createTestUser();

      const users = await userService.getAllUsers();

      expect(users.length).toBe(2);
      expect(users.some((user) => user._id.equals(user1._id))).toBe(true);
      expect(users.some((user) => user._id.equals(user2._id))).toBe(true);
    });

    it("should return all users with populated user structure", async () => {
      const user = await createTestUser();
      const users = await userService.getAllUsers();

      expect(users.length).toBe(1);
      expect(users[0]._id).toEqual(user._id);
      expect(users[0].profile.files[0]._id).toEqual(user.profile.files[0]._id);
      expectMatch(TestUserValidator, users[0]);
    });
  });

  describe("getUserById", () => {
    it("should return the correct user", async () => {
      const user = await createTestUser();
      await createTestUser();

      const foundUser = await userService.getUserById(user._id.toString());

      expect(foundUser._id).toEqual(user._id);
    });

    it("should return a populated user", async () => {
      const user = await createTestUser();
      const foundUser = await userService.getUserById(user._id.toString());

      const originalFiles = user.profile.files;
      const foundFiles = foundUser.profile.files;
      expect(foundFiles.length).toBeGreaterThan(0);
      expect(foundFiles[0]._id).toEqual(originalFiles[0]._id);
      expectMatch(TestUserValidator, foundUser);
    });

    it("should throw a UserNotFoundError if the user does not exist", async () => {
      expect.assertions(1);
      await createTestUser();
      await createTestUser();
      await expect(
        userService.getUserById(new ObjectId().toString())
      ).rejects.toThrow(UserNotFoundError);
    });
  });

  describe("createUser", () => {
    it("should add a user to the database", async () => {
      const userData = await defaultUserData();
      await userService.createUser(userData);

      const users = await UserModel.find();
      expect(users.length).toBe(1);
    });

    it("should return the created user", async () => {
      const userData = await defaultUserData();
      const createdUser = await userService.createUser(userData);

      const users = await UserModel.find();
      expect(users[0]._id).toEqual(createdUser._id);
      expectMatch(TestUserValidator, createdUser);
    });

    it("should throw a UserConflictError if the email is already in use", async () => {
      expect.assertions(1);
      const userData = await defaultUserData();
      await userService.createUser(userData);

      await expect(userService.createUser(userData)).rejects.toThrow(
        UserConflictError
      );
    });

    it("should throw a UserConflictError for a case-insensitive email conflict", async () => {
      expect.assertions(1);
      const userData = await defaultUserData();
      await userService.createUser(userData);

      await expect(
        userService.createUser({
          ...userData,
          email: userData.email.toUpperCase(),
        })
      ).rejects.toThrow(UserConflictError);
    });
  });

  describe("updateUser", () => {
    it("should not change the number of users", async () => {
      const user = await createTestUser();

      await userService.updateUser(user._id.toString(), {
        first: "NewFirstName",
      });

      const users = await UserModel.find();
      expect(users.length).toBe(1);
    });

    it("should update an existing user", async () => {
      const user = await createTestUser();
      const newFirst = `${user.first}!`;

      await userService.updateUser(user._id.toString(), {
        first: newFirst,
      });

      const [updatedUser] = await UserModel.find();
      expect(updatedUser.first).not.toEqual(user.first);
      expect(updatedUser.first).toEqual(newFirst);
    });

    it("should return the updated user", async () => {
      const user1 = await createTestUser();
      const user2 = await createTestUser();
      const newFirst = `${user1.first}!`;

      const updatedUser = await userService.updateUser(user1._id.toString(), {
        first: newFirst,
      });

      expect(updatedUser._id).not.toEqual(user2._id);
      expect(updatedUser._id).toEqual(user1._id);
      expect(updatedUser.first).toEqual(newFirst);
      expectMatch(TestUserValidator, updatedUser);
    });

    it("should throw a UserNotFoundError for a non-existent user", async () => {
      expect.assertions(1);
      await createTestUser();
      await createTestUser();
      await expect(
        userService.updateUser(new ObjectId().toString(), {
          first: "NewName",
        })
      ).rejects.toThrow(UserNotFoundError);
    });

    it("should throw a UserConflictError for an email conflict", async () => {
      expect.assertions(1);
      await createTestUser({
        email: "test@example.com",
      });
      const user2 = await createTestUser({
        email: "different@example.com",
      });
      await expect(
        userService.updateUser(user2._id.toString(), {
          email: "test@example.com",
        })
      ).rejects.toThrow(UserConflictError);
    });

    it("should throw a UserConflictError for a case-insensitive email conflict", async () => {
      expect.assertions(1);
      await createTestUser({
        email: "test@example.com",
      });
      const user2 = await createTestUser({
        email: "different@example.com",
      });
      await expect(
        userService.updateUser(user2._id.toString(), {
          email: "TEST@example.com",
        })
      ).rejects.toThrow(UserConflictError);
    });
  });

  describe("deleteUser", () => {
    it("should delete the user from the database", async () => {
      const user = await createTestUser();
      await createTestUser();

      await userService.deleteUser(user._id.toString());

      const users = await UserModel.find();
      expect(users.length).toBe(1);
      expect(users[0]._id).not.toEqual(user._id);
    });

    it("should return the deleted user", async () => {
      const user = await createTestUser();
      await createTestUser();

      const deletedUser = await userService.deleteUser(user._id.toString());

      expect(deletedUser._id).toEqual(user._id);
      expectMatch(TestUserValidator, deletedUser);
    });

    it("should throw a UserNotFoundError for a non-existent user", async () => {
      expect.assertions(1);
      await createTestUser();
      await createTestUser();
      await expect(
        userService.deleteUser(new ObjectId().toString())
      ).rejects.toThrow(UserNotFoundError);
    });
  });

  describe("addFile", () => {
    it("should add a file to the user's profile", async () => {
      const user = await createTestUser();
      const file = await createTestFile();
      const files = user.profile.files;

      const updatedUser = await userService.addFile(
        user._id.toString(),
        file._id.toString()
      );
      const updatedFiles = updatedUser.profile.files;

      expect(updatedFiles.length).toBe(files.length + 1);
      expect(updatedFiles.some((f) => f._id.equals(file._id))).toBe(true);
    });

    it("should return an updated user with the new file", async () => {
      const user = await createTestUser();
      const file = await createTestFile();

      const updatedUser = await userService.addFile(
        user._id.toString(),
        file._id.toString()
      );
      const updatedFiles = updatedUser.profile.files;

      expect(updatedUser._id).toEqual(user._id);
      expect(updatedFiles.some((f) => f._id.equals(file._id))).toBe(true);
      expectMatch(TestUserValidator, updatedUser);
    });

    it("should throw a UserNotFoundError if the user does not exist", async () => {
      expect.assertions(1);
      await createTestUser();
      await createTestUser();
      const file = await createTestFile();
      await expect(
        userService.addFile(new ObjectId().toString(), file._id.toString())
      ).rejects.toThrow(UserNotFoundError);
    });

    it("should throw a FileConflictError if the file already exists for the user", async () => {
      expect.assertions(1);
      const user = await createTestUser();
      const file = user.profile.files[0];
      await expect(
        userService.addFile(user._id.toString(), file._id.toString())
      ).rejects.toThrow(FileConflictError);
    });
  });

  describe("deleteFile", () => {
    it("should remove a file from the user's profile", async () => {
      const user = await createTestUser();
      const files = user.profile.files;
      const file = files[0];

      const updatedUser = await userService.removeFile(
        user._id.toString(),
        file._id.toString()
      );
      const updatedFiles = updatedUser.profile.files;

      expect(updatedFiles.length).toBe(files.length - 1);
      expect(updatedFiles.some((f) => f._id.equals(file._id))).toBe(false);
    });

    it("should return an updated user without the deleted file", async () => {
      const user = await createTestUser();
      const files = user.profile.files;
      const file = files[0];

      const updatedUser = await userService.removeFile(
        user._id.toString(),
        file._id.toString()
      );
      const updatedFiles = updatedUser.profile.files;

      expect(updatedUser._id).toEqual(user._id);
      expect(updatedFiles.some((f) => f._id.equals(file._id))).toBe(false);
      expectMatch(TestUserValidator, updatedUser);
    });

    it("should throw a UserNotFoundError if the user does not exist", async () => {
      expect.assertions(1);
      await createTestUser();
      await createTestUser();
      const file = await createTestFile();
      await expect(
        userService.removeFile(new ObjectId().toString(), file._id.toString())
      ).rejects.toThrow(UserNotFoundError);
    });

    it("should throw a FileNotFoundError if the file does not exist", async () => {
      expect.assertions(1);
      const user = await createTestUser();
      await expect(
        userService.removeFile(user._id.toString(), new ObjectId().toString())
      ).rejects.toThrow(FileNotFoundError);
    });

    it("should throw a FileNotFoundError if the file does not exist for the user", async () => {
      expect.assertions(1);
      const user = await createTestUser();
      const file = await createTestFile();
      await expect(
        userService.removeFile(user._id.toString(), file._id.toString())
      ).rejects.toThrow(FileNotFoundError);
    });
  });
});
