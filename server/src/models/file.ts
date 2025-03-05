import { IsIn, IsNotEmpty, IsString, Validate } from "class-validator";
import MaxFileSize from "@/utils/maxBufferSizeConstraint";
import mongoose, { Schema, HydratedDocument } from "mongoose";
import MaxBufferSize from "@/utils/maxBufferSizeConstraint";

interface IFile {
  _id?: string;
  name: string;
  type: string;
  data: Buffer;
}

class FileValidator {
  @IsString()
  @IsNotEmpty()
  originalname!: string;

  @IsString()
  @IsIn(["image/jpeg", "image/png", "application/pdf"])
  mimetype!: string;

  @IsNotEmpty()
  @MaxBufferSize(5)
  buffer!: Buffer;
}

type FileDocument = HydratedDocument<IFile>;

const fileSchema = new Schema<IFile>({
  name: { type: String, required: true },
  type: { type: String, required: true },
  data: { type: Buffer, required: true },
});

const FileModel = mongoose.model<IFile>("File", fileSchema, "files");

export { FileModel, IFile, FileValidator, FileDocument };
