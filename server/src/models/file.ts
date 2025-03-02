import mongoose, { Schema, HydratedDocument } from "mongoose";

interface IFile {
  name: string;
  type: string;
  id: Buffer;
}

type IFileDocument = HydratedDocument<IFile>;
const profileSchema = new Schema<IFileDocument>({
  name: { type: String },
  type: { type: String },
  id: { type: Buffer },
});

const File = mongoose.model<IFileDocument>("File", profileSchema, "files");

export { File, IFile, IFileDocument };
