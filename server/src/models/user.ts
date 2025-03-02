import mongoose, { Schema, HydratedDocument } from "mongoose";

interface IUser {
  first: string;
  last: string;
  email: string;
  password: string;
  profile: Schema.Types.ObjectId;
  isEmployer: boolean;
  entryDate: Date;
}

type IUserDocument = HydratedDocument<IUser>;
const userSchema = new Schema<IUserDocument>({
  first: { type: String, required: true },
  last: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profile: { type: Schema.Types.ObjectId, ref: "Profile", required: true },
  isEmployer: { type: Boolean, required: true },
  entryDate: { type: Date, required: true, default: () => Date.now() },
});

const User = mongoose.model<IUserDocument>("User", userSchema, "users");
export { User, IUser };
