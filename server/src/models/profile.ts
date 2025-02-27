import mongoose, { Schema, Document } from "mongoose";

interface IProfile extends Document {
  text: {
    bio: string;
    work: string;
    research: string;
    volunteering: string;
  };
  files: {
    resume: mongoose.Types.ObjectId | null;
    recommendations: mongoose.Types.ObjectId[];
    video: mongoose.Types.ObjectId | null;
  };
}

const profileSchema = new Schema<IProfile>({
  text: {
    bio: { type: String, default: null },
    work: { type: String, default: null },
    research: { type: String, default: null },
    volunteering: { type: String, default: null },
  },
  files: {
    resume: { type: Schema.Types.ObjectId, default: null },
    recommendations: { type: [Schema.Types.ObjectId], default: [] },
    video: { type: Schema.Types.ObjectId, default: null },
  },
});

const Profiles = mongoose.model("Profiles", profileSchema, "profiles");
export default Profiles;
