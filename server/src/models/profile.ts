import mongoose, { Schema, HydratedDocument } from "mongoose";

interface IProfile {
  bio?: string;
  work?: string;
  research?: string;
  volunteering?: string;
  files: Schema.Types.ObjectId[];
}

type IProfileDocument = HydratedDocument<IProfile>;
const profileSchema = new Schema<IProfileDocument>({
  bio: { type: String },
  work: { type: String },
  research: { type: String },
  volunteering: { type: String },
  files: { type: [Schema.Types.ObjectId], ref: "File" , default: [] },
});

const Profile = mongoose.model<IProfileDocument>("Profile", profileSchema, "profiles");

export { Profile, IProfile, IProfileDocument };
