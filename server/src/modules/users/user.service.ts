import { Model } from "mongoose";
import {
  UserNotFoundError,
  UserConflictError,
  User,
  UserDoc,
  PopulatedProfile,
  PopulatedUser,
  hashPassword,
  comparePassword,
} from "@/modules/users";
import { MongoError, ObjectId } from "mongodb";
import { FileConflictError, FileNotFoundError } from "@/modules/files";

class UserService {
  constructor(private users: Model<User>) {}

  async login(email: string, password: string): Promise<PopulatedUser | null> {
    const user = await this.users
      .findOne<PopulatedUser>({ email })
      .populate<{ profile: PopulatedProfile }>("profile.files")
      .exec();
    if (!user) {
      return null;
    }
    const isPasswordValid = await comparePassword(password, user.password);
    return isPasswordValid ? user : null;
  }

  async getAllUsers(): Promise<PopulatedUser[]> {
    return this.users
      .find<PopulatedUser>()
      .populate<{ profile: PopulatedProfile }>("profile.files")
      .exec();
  }

  async getUserById(userId: string): Promise<PopulatedUser> {
    const user = await this.users
      .findById<UserDoc>(userId)
      .populate<{ profile: PopulatedProfile }>("profile.files")
      .exec();
    if (!user) {
      throw new UserNotFoundError(`User with id ${userId} not found`);
    }
    return user;
  }

  async createUser(userData: User): Promise<PopulatedUser> {
    try {
      userData.password = await hashPassword(userData.password);
      const user = new this.users(userData);
      await user.save();
      return user.populate<{ profile: PopulatedProfile }>("profile.files");
    } catch (error) {
      if (error instanceof MongoError && error.code === 11000) {
        throw new UserConflictError(
          `User with email ${userData.email} already exists`
        );
      }
      throw error;
    }
  }

  async updateUser(
    userId: string,
    userData: Partial<User>
  ): Promise<PopulatedUser> {
    try {
      if (userData.password !== undefined && userData.password !== null) {
        userData.password = await hashPassword(userData.password);
      }
      const user = await this.users
        .findByIdAndUpdate<UserDoc>(userId, userData, { new: true })
        .populate<{ profile: PopulatedProfile }>("profile.files")
        .exec();
      if (!user) {
        throw new UserNotFoundError(`User with id ${userId} not found`);
      }
      return user;
    } catch (error) {
      if (error instanceof MongoError && error.code === 11000) {
        throw new UserConflictError(
          `User with email ${userData.email} already exists`
        );
      }
      throw error;
    }
  }

  async deleteUser(userId: string): Promise<PopulatedUser> {
    const user = await this.users
      .findByIdAndDelete<UserDoc>(userId)
      .populate<{ profile: PopulatedProfile }>("profile.files")
      .exec();
    if (!user) {
      throw new UserNotFoundError(`User with id ${userId} not found`);
    }
    return user;
  }

  async addFile(userId: string, fileId: string): Promise<PopulatedUser> {
    const user = await this.users.findById<UserDoc>(userId).exec();
    if (!user) {
      throw new UserNotFoundError(`User with id ${userId} not found`);
    } else if (user.profile.files.includes(new ObjectId(fileId))) {
      throw new FileConflictError(
        `File with id ${fileId} already exists for user with id ${userId}`
      );
    }
    user.profile.files.push(new ObjectId(fileId));
    await user.save();
    return user.populate<{ profile: PopulatedProfile }>("profile.files");
  }

  async removeFile(userId: string, fileId: string): Promise<PopulatedUser> {
    const user = await this.users.findById<UserDoc>(userId).exec();
    if (!user) {
      throw new UserNotFoundError(`User with id ${userId} not found`);
    } else if (!user.profile.files.includes(new ObjectId(fileId))) {
      throw new FileNotFoundError(
        `File with id ${fileId} not found for user with id ${userId}`
      );
    }
    user.profile.files = user.profile.files.filter(
      (file) => file.toHexString() !== fileId
    );
    await user.save();
    return user.populate<{ profile: PopulatedProfile }>("profile.files");
  }
}

export { UserService };
