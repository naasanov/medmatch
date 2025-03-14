import mongoose, { Schema, HydratedDocument, InferSchemaType } from "mongoose";

const fileSchema = new Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  data: { type: Buffer, required: true },
});

interface File extends InferSchemaType<typeof fileSchema> {
  type: "image/jpeg" | "image/png" | "application/pdf";
}
interface FileDoc extends HydratedDocument<File> {}

const FileModel = mongoose.model<File>("File", fileSchema, "files");

export { FileModel, File, FileDoc };
