import mongoose, { Schema, HydratedDocument } from "mongoose";
import { IsBoolean, IsDate, IsEmail, IsNotEmpty, IsString } from "class-validator";

interface IUser {
  _id?: string;
  first: string;
  last: string;
  email: string;
  password: string;
  profile: Schema.Types.ObjectId | string;
  isEmployer: boolean;
  entryDate: Date;
}

class UserValidator {
  @IsString()
  @IsNotEmpty()
  first!: string;

  @IsString()
  @IsNotEmpty()
  last!: string;

  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsString()
  @IsNotEmpty()
  password!: string;

  @IsBoolean()
  isEmployer!: boolean;

  @IsDate()
  @IsNotEmpty()
  entryDate!: Date;
}

type IUserDocument = HydratedDocument<IUser>;

const userSchema = new Schema<IUser>({
  first: { type: String, required: true },
  last: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profile: { type: Schema.Types.ObjectId, ref: "Profile", required: true },
  isEmployer: { type: Boolean, required: true },
  entryDate: { type: Date, required: true, default: () => Date.now() },
});

const UserModel = mongoose.model<IUser>("User", userSchema, "users");
export { UserModel, IUser, UserValidator, IUserDocument };
