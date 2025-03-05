import { IFile } from "@/models/file";
import { Model } from "mongoose";
import { FileNotFoundError } from "@/files/file.errors";

class FileService {
  constructor(private files: Model<IFile>) {}

  async getAllFiles(): Promise<IFile[]> {
    return this.files.find<IFile>().exec();
  }

  async getFileById(id: string): Promise<IFile> {
    const file = await this.files.findById<IFile>(id).exec();
    if (!file) {
      throw new FileNotFoundError(`File with id ${id} not found`);
    }
    return file;
  }

  async createFile(fileData: IFile): Promise<IFile> {
    const file = new this.files(fileData);
    return file.save();
  }

  async deleteFile(id: string): Promise<IFile> {
    const file = await this.files.findByIdAndDelete<IFile>(id).exec();
    if (!file) {
      throw new FileNotFoundError(`File with id ${id} not found`);
    }
    return file;
  }
}

export default FileService;
