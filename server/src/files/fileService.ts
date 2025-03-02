import { IFile } from "@/models/file";
import { NotFoundError } from "@/types/errors";
import { Model } from "mongoose";
import { FileCode } from "@/types/errorCodes";

class FileService {
  private files: Model<IFile>;

  constructor(fileModel: Model<IFile>) {
    this.files = fileModel;
  }

  async getAllFiles(): Promise<IFile[]> {
    return this.files.find<IFile>().exec();
  }

  async getFileById(id: string): Promise<IFile | null> {
    const file = this.files.findById<IFile>(id).exec();
    if (!file) {
      throw new NotFoundError("File not found", FileCode.FileNotFound);
    }
    return file
  }

  async createFile(fileData: IFile): Promise<IFile> {
    const file = new this.files(fileData);
    return file.save();
  }

  async deleteFile(id: string) {
    return this.files.findByIdAndDelete<IFile>(id);
  }
}

export default FileService;