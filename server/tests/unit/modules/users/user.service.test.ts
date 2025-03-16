import "reflect-metadata";
import { UserService, UserModel } from "@/modules/users";
import {
  createTestUser,
  TestUserValidator,
} from "#/unit/modules/users/user.utils";
import { expectMatch } from "#/utils/validation";
import { Document } from "mongoose";

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
      expectMatch(TestUserValidator, (users[0] as unknown as Document).toObject());
    });
  });
});
