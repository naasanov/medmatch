import { File, FileDoc } from "@/modules/files";
import { Model } from "mongoose";
import { FileNotFoundError } from "@/modules/files/utils/file.errors";
import { ID } from "@/types/mongoose";

class FileService {
  constructor(private files: Model<File>) {}

  async getAllFiles(): Promise<(File & ID)[]> {
    const test = await this.files.find<FileDoc>().exec();
    return test;
  }

  async getFileById(fileId: string): Promise<File & ID> {
    const file = await this.files.findById<FileDoc>(fileId).exec();
    if (!file) {
      throw new FileNotFoundError(`File with id ${fileId} not found`);
    }
    return file;
  }

  async createFile(fileData: File): Promise<File & ID> {
    const file = new this.files(fileData);
    return file.save();
  }

  async deleteFile(fileId: string): Promise<File & ID> {
    const file = await this.files.findByIdAndDelete<FileDoc>(fileId).exec();
    if (!file) {
      throw new FileNotFoundError(`File with id ${fileId} not found`);
    }
    return file;
  }
}

export { FileService };
