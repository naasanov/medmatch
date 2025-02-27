import mongoose, { Schema, HydratedDocument } from "mongoose";

interface IProfile {
  text: {
    bio?: string;
    work?: string;
    research?: string;
    volunteering?: string;
  };
  files: {
    resume?: Schema.Types.ObjectId;
    recommendations: Schema.Types.ObjectId[];
    video?: Schema.Types.ObjectId;
  };
}

type IProfileDocument = HydratedDocument<IProfile>;
const profileSchema = new Schema<IProfileDocument>({
  text: {
    bio: { type: String },
    work: { type: String },
    research: { type: String },
    volunteering: { type: String },
  },
  files: {
    resume: { type: Schema.Types.ObjectId },
    recommendations: { type: [Schema.Types.ObjectId], default: [] },
    video: { type: Schema.Types.ObjectId },
  },
});

const Profile = mongoose.model<IProfileDocument>("Profile", profileSchema, "profiles");

export { Profile, IProfile, IProfileDocument };
