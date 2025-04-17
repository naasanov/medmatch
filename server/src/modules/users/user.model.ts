import { ModelWithOverrides, Replace } from "@/types/mongoose";
import mongoose, {
  Schema,
  HydratedDocument,
  InferSchemaType,
  HydratedSingleSubdocument,
} from "mongoose";
import { File, FileDoc } from "@/modules/files";

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
  entryDate: { type: Date, required: true, default: () => Date.now() },
});

type ProfileSchema = InferSchemaType<typeof profileSchema>;
type InputProfile = Replace<ProfileSchema, { files: string[] }>;

type UnpopulatedProfileDoc = HydratedSingleSubdocument<ProfileSchema>;
type ProfileDoc = Replace<UnpopulatedProfileDoc, { files: FileDoc[] }>;

class Profile implements Replace<ProfileSchema, { files: File[] }> {
  constructor(
    public id: string,
    public files: File[],
    public bio?: string | null,
    public work?: string | null,
    public research?: string | null,
    public volunteering?: string | null
  ) {}

  static fromDoc(doc: ProfileDoc): Profile {
    return new Profile(
      doc._id.toString(),
      doc.files.map((file) => File.fromDoc(file)),
      doc.bio,
      doc.work,
      doc.research,
      doc.volunteering
    );
  }
}

type UserSchema = InferSchemaType<typeof userSchema>;
type InputUser = Replace<UserSchema, { profile: InputProfile }>;

type UnpopulatedUserDoc = HydratedDocument<UserSchema>;
type UserDoc = Replace<UnpopulatedUserDoc, { profile: ProfileDoc }>;

class User implements Replace<UserSchema, { profile: Profile }> {
  constructor(
    public id: string,
    public first: string,
    public last: string,
    public email: string,
    public password: string,
    public profile: Profile,
    public isEmployer: boolean,
    public entryDate: Date
  ) {}

  static fromDoc(doc: UserDoc): User {
    return new User(
      doc._id.toString(),
      doc.first,
      doc.last,
      doc.email,
      doc.password,
      Profile.fromDoc(doc.profile),
      doc.isEmployer,
      doc.entryDate
    );
  }
}

type UserModelType = ModelWithOverrides<UnpopulatedUserDoc, UserDoc>;
const UserModel = mongoose.model<UserSchema, UserModelType>(
  "User",
  userSchema,
  "users"
);

export {
  ProfileSchema,
  UnpopulatedProfileDoc,
  ProfileDoc,
  Profile,
  UserSchema,
  UnpopulatedUserDoc,
  UserDoc,
  User,
  UserModel,
  UserModelType,
  InputUser,
  InputProfile,
};
