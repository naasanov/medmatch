import FileService from "@/files/file.service";
import { IFile } from "@/models/file";
import asyncHandler from "express-async-handler";

class FileController {
  constructor(private fileService: FileService) {}

  getAllFiles = asyncHandler(async (req, res): Promise<any> => {
    const files = await this.fileService.getAllFiles();
    return res.status(200).json({
      success: true,
      message: "Files retrieved successfully",
      data: files,
    });
  });

  getFileById = asyncHandler(async (req, res): Promise<any> => {
    const { id } = req.params;
    const file = await this.fileService.getFileById(id);
    return res.status(200).json({
      success: true,
      message: `File with id ${id} retrieved successfully`,
      data: file,
    });
  });

  createFile = asyncHandler(async (req, res): Promise<any> => {
    const { originalname, mimetype, buffer } = req.file!;
    const fileData: IFile = {
      name: originalname,
      type: mimetype,
      data: buffer,
    };
    const file = await this.fileService.createFile(fileData);
    return res.status(201).json({
      success: true,
      message: `File with id ${file._id} created successfully`,
      data: file,
    });
  });

  deleteFile = asyncHandler(async (req, res): Promise<any> => {
    const { id } = req.params;
    const file = await this.fileService.deleteFile(id);
    return res.status(200).json({
      success: true,
      message: `File with id ${id} deleted successfully`,
      data: file,
    });
  });
}

export default FileController;
