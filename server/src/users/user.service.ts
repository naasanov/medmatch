import { IUser } from "@/models/user";
import { Model, UpdateQuery } from "mongoose";
import { UserNotFoundError, UserConflictError } from "./user.errors";
import { MongoError } from "mongodb";

class UserService {
  constructor(private users: Model<IUser>) {}

  async getAllUsers(): Promise<IUser[]> {
    return this.users.find<IUser>().populate("profile").exec();
  }

  async getUserById(id: string): Promise<IUser> {
    const user = await this.users
      .findById<IUser>(id)
      .populate("profile")
      .exec();
    if (!user) {
      throw new UserNotFoundError(`User with id ${id} not found`);
    }
    return user;
  }

  async createUser(userData: IUser): Promise<IUser> {
    try {
      const user = new this.users(userData);
      return user.save();
    } catch (error) {
      if (error instanceof MongoError && error.code === 11000) {
        throw new UserConflictError("User already exists");
      }
      throw error;
    }
  }

  async updateUser(id: string, userData: UpdateQuery<IUser>): Promise<IUser> {
    const user = await this.users
      .findByIdAndUpdate<IUser>(id, userData, { new: true })
      .exec();
    if (!user) {
      throw new UserNotFoundError(`User with id ${id} not found`);
    }
    return user;
  }

  async deleteUser(id: string): Promise<IUser> {
    const user = await this.users.findByIdAndDelete<IUser>(id).exec();
    if (!user) {
      throw new UserNotFoundError(`User with id ${id} not found`);
    }
    return user;
  }
}

export default UserService;
