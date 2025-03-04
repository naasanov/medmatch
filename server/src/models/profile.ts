import mongoose, { Schema, HydratedDocument } from "mongoose";

interface IProfile {
  _id: string;
  bio?: string;
  work?: string;
  research?: string;
  volunteering?: string;
  files: Schema.Types.ObjectId[];
}

type IProfileDocument = HydratedDocument<IProfile>;

const profileSchema = new Schema<IProfile>({
  bio: { type: String },
  work: { type: String },
  research: { type: String },
  volunteering: { type: String },
  files: { type: [Schema.Types.ObjectId], ref: "File" , default: [] },
});

const Profile = mongoose.model<IProfile>("Profile", profileSchema, "profiles");

export { Profile, IProfile, IProfileDocument };
