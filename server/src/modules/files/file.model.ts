import mongoose, { Schema, HydratedDocument } from "mongoose";

interface IFile {
  _id?: string;
  name: string;
  type: string;
  data: Buffer;
}

type FileDocument = HydratedDocument<IFile>;

const fileSchema = new Schema<IFile>({
  name: { type: String, required: true },
  type: { type: String, required: true },
  data: { type: Buffer, required: true },
});

const FileModel = mongoose.model<IFile>("File", fileSchema, "files");

export { FileModel, IFile, FileDocument };
