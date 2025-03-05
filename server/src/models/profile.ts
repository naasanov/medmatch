import mongoose, { Schema, HydratedDocument } from "mongoose";
import { IsArray, IsMongoId, IsNotEmpty, IsString } from "class-validator";

interface IProfile {
  _id: string;
  bio?: string;
  work?: string;
  research?: string;
  volunteering?: string;
  files: Schema.Types.ObjectId[];
}

class ProfileValidator {
  @IsString()
  @IsNotEmpty()
  bio!: string;

  @IsString()
  @IsNotEmpty()
  work!: string;

  @IsString()
  @IsNotEmpty()
  research!: string;

  @IsString()
  @IsNotEmpty()
  volunteering!: string;

  @IsArray()
  @IsMongoId({ each: true })
  files!: Schema.Types.ObjectId[];
}

type IProfileDocument = HydratedDocument<IProfile>;

const profileSchema = new Schema<IProfile>({
  bio: { type: String },
  work: { type: String },
  research: { type: String },
  volunteering: { type: String },
  files: { type: [Schema.Types.ObjectId], ref: "File", default: [] },
});

const ProfileModel = mongoose.model<IProfile>(
  "Profile",
  profileSchema,
  "profiles"
);

export { ProfileModel, IProfile, ProfileValidator, IProfileDocument };
