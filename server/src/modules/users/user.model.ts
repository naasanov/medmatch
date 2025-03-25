import { ModelWithOverrides, Replace, ID } from "@/types/mongoose";
import mongoose, {
  Schema,
  HydratedDocument,
  InferSchemaType,
  HydratedSingleSubdocument,
} from "mongoose";
import { File } from "@/modules/files";

const profileSchema = new Schema({
  bio: { type: String },
  work: { type: String },
  research: { type: String },
  volunteering: { type: String },
  files: { type: [Schema.Types.ObjectId], ref: "File", default: [] },
});

const userSchema = new Schema({
  first: { type: String, required: true },
  last: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true }, // lowercase email to ensure case insensitive uniqueness
  password: { type: String, required: true },
  profile: { type: profileSchema, default: () => ({}) },
  isEmployer: { type: Boolean, required: true },
  entryDate: { type: Date, default: () => Date.now() },
});

interface Profile extends InferSchemaType<typeof profileSchema> {}
interface ProfileDoc extends HydratedSingleSubdocument<Profile> {}
type PopulatedProfile = Replace<Profile & ID, { files: (File & ID)[] }>;

interface User extends InferSchemaType<typeof userSchema> {
  profile: Profile;
}
interface UserDoc extends HydratedDocument<User> {
  profile: ProfileDoc;
}
type PopulatedUser = Replace<User & ID, { profile: PopulatedProfile }>;

type UserModelType = ModelWithOverrides<User, UserDoc>;
const UserModel = mongoose.model<User, UserModelType>(
  "User",
  userSchema,
  "users"
);

export {
  UserModel,
  Profile,
  ProfileDoc,
  User,
  UserDoc,
  PopulatedProfile,
  PopulatedUser,
};
