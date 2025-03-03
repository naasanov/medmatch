import { Router } from "express";
import { File } from "@/models/file";
import FileService from "@/files/fileService";
import FileController from "@/files/fileController";
import multer from "multer";

const router = Router();
const fileService = new FileService(File);
const fileController = new FileController(fileService);
const upload = multer();

router.get("/", fileController.getAllFiles);
router.get("/:id", fileController.getFileById);
router.post("/", upload.single("file"), fileController.createFile);
router.delete("/:id", fileController.deleteFile);

export default router;