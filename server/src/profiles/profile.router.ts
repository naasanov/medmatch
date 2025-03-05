import { Router } from "express";
import { ProfileValidator, ProfileModel } from "@/models/profile";
import { FileModel, FileValidator } from "@/models/file";
import ProfileService from "@/profiles/profile.service";
import FileService from "@/files/file.service";
import ProfileController from "@/profiles/profile.controller";
import multer from "multer";
import {
  validation,
  validateBody,
  validatePartialBody,
  validateId,
  validateFile,
} from "@/utils/validationMiddleware";

const router = Router();
const profileService = new ProfileService(ProfileModel);
const fileService = new FileService(FileModel);
const profileController = new ProfileController(profileService, fileService);
const upload = multer();

router.get("/", profileController.getAllProfiles);

router.get(
  "/:id",
  validation(validateId("id")),
  profileController.getProfileById
);

router.post(
  "/",
  validation(validateBody(ProfileValidator)),
  profileController.createProfile
);

router.put(
  "/:id",
  validation(validateId("id"), validatePartialBody(ProfileValidator)),
  profileController.updateProfile
);

router.post(
  "/:id/files",
  upload.single("file"),
  validation(validateId("id"), validateFile(FileValidator)),
  profileController.addFile
);

router.delete(
  "/:profileId/files/:fileId",
  validation(validateId("profileId"), validateId("fileId")),
  profileController.removeFile
);

export default router;
