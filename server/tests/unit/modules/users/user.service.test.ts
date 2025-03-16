import "reflect-metadata";
import {
  UserService,
  UserModel,
  UserNotFoundError,
  UserConflictError,
} from "@/modules/users";
import {
  createTestUser,
  defaultUserData,
  TestUserValidator,
} from "#/unit/modules/users/user.utils";
import { expectMatch } from "#/utils/validation";
import { ObjectId } from "mongodb";

describe("UserService", () => {
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
      const user1 = await createTestUser();
      await createTestUser();

      const foundUser = await userService.getUserById(user1._id.toString());

      expect(foundUser._id).toEqual(user1._id);
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
      await Promise.all([createTestUser(), createTestUser()]);
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

  describe("updateUser", () => {});
});
