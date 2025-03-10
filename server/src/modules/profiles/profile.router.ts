import { Router } from "express";
import multer from "multer";
import {
  ProfileModel,
  ProfileService,
  ProfileController,
  ProfileValidator,
} from "@/modules/profiles";
import { FileModel, FileValidator, FileService } from "@/modules/files/";
import {
  validation,
  validateBody,
  validatePartialBody,
  validateId,
  validateFile,
} from "@/utils/validationMiddleware";

const profileRouter = Router();
const profileService = new ProfileService(ProfileModel);
const fileService = new FileService(FileModel);
const profileController = new ProfileController(profileService, fileService);
const upload = multer();

profileRouter.get("/", profileController.getAllProfiles);

profileRouter.get(
  "/:id",
  validation(validateId("id")),
  profileController.getProfileById
);

profileRouter.post(
  "/",
  validation(validateBody(ProfileValidator)),
  profileController.createProfile
);

profileRouter.put(
  "/:id",
  validation(validateId("id"), validatePartialBody(ProfileValidator)),
  profileController.updateProfile
);

profileRouter.post(
  "/:id/files",
  upload.single("file"),
  validation(validateId("id"), validateFile(FileValidator)),
  profileController.addFile
);

profileRouter.delete(
  "/:profileId/files/:fileId",
  validation(validateId("profileId"), validateId("fileId")),
  profileController.removeFile
);

export { profileRouter };
