import { Router } from "express";
import { FileModel, FileValidator } from "@/models/file";
import FileService from "@/files/file.service";
import FileController from "@/files/file.controller";
import multer from "multer";
import {
  validateFile,
  validateId,
  validation,
} from "@/utils/validationMiddleware";

const router = Router();
const fileService = new FileService(FileModel);
const fileController = new FileController(fileService);
const upload = multer();

router.get("/", fileController.getAllFiles);

router.get("/:id", validateId("id"), fileController.getFileById);

router.post(
  "/",
  upload.single("file"),
  validation(validateFile(FileValidator)),
  fileController.createFile
);

router.delete("/:id", validateId("id"), fileController.deleteFile);

export default router;
