import FileService from "@/modules/files/file.service";
import { IFile } from "@/models/file";
import { HandleErrors } from "@/utils/errorHandler";
import { Request, Response } from "express";

class FileController {
  constructor(private fileService: FileService) {}

  @HandleErrors()
  async getAllFiles(req: Request, res: Response): Promise<void> {
    const files = await this.fileService.getAllFiles();
    res.status(200).json({
      success: true,
      message: "Files retrieved successfully",
      data: files,
    });
  }

  @HandleErrors()
  async getFileById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const file = await this.fileService.getFileById(id);
    res.status(200).json({
      success: true,
      message: `File with id ${id} retrieved successfully`,
      data: file,
    });
  }

  @HandleErrors()
  async createFile(req: Request, res: Response): Promise<void> {
    const { originalname, mimetype, buffer } = req.file!;
    const fileData: IFile = {
      name: originalname,
      type: mimetype,
      data: buffer,
    };
    const file = await this.fileService.createFile(fileData);
    res.status(201).json({
      success: true,
      message: `File with id ${file._id} created successfully`,
      data: file,
    });
  }

  @HandleErrors()
  async deleteFile(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const file = await this.fileService.deleteFile(id);
    res.status(200).json({
      success: true,
      message: `File with id ${id} deleted successfully`,
      data: file,
    });
  }
}

export default FileController;
