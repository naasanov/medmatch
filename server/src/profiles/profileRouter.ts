import { Router } from "express";
import { Profile } from "@/models/profile";
import { File } from "@/models/file";
import ProfileService from "@/profiles/profileService";
import FileService from "@/files/fileService";
import ProfileController from "@/profiles/profileController";
import multer from 'multer';

const router = Router();
const profileService = new ProfileService(Profile);
const fileService = new FileService(File);
const profileController = new ProfileController(profileService, fileService);
const upload = multer();

router.get("/", profileController.getAllProfiles);
router.get("/:id", profileController.getProfileById);
router.post("/", profileController.createProfile);
router.put("/:id", profileController.updateProfile);
router.post("/:profileId/files", upload.single('file'), profileController.addFile);
router.delete("/:profileId/files/:fileId", profileController.removeFile);

export default router;