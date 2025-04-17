import { File, FileDoc, FileSchema } from "@/modules/files";
import { Model } from "mongoose";
import { FileNotFoundError } from "@/modules/files/utils/file.errors";

class FileService {
  constructor(private fileModel: Model<FileSchema>) {}

  async getAllFiles(): Promise<File[]> {
    const docs = await this.fileModel.find<FileDoc>().exec();
    return docs.map((doc) => File.fromDoc(doc));
  }

  async getFileById(fileId: string): Promise<File> {
    const doc = await this.fileModel.findById<FileDoc>(fileId).exec();
    if (!doc) {
      throw new FileNotFoundError(`File with id ${fileId} not found`);
    }
    return File.fromDoc(doc);
  }

  async createFile(fileData: Omit<File, "id">): Promise<File> {
    const file = new this.fileModel(fileData);
    const doc = await file.save();
    return File.fromDoc(doc);
  }

  async deleteFile(fileId: string): Promise<File> {
    const doc = await this.fileModel.findByIdAndDelete<FileDoc>(fileId).exec();
    if (!doc) {
      throw new FileNotFoundError(`File with id ${fileId} not found`);
    }
    return File.fromDoc(doc);
  }
}

export { FileService };
