import { Router } from "express";
import ProfileController from "@/profiles/profileController";
const router = Router();

const profileController = new ProfileController();

router.get("/", profileController.getAllProfiles);
router.get("/:id", profileController.getProfileById);
router.post("/", profileController.createProfile);
router.put("/:id", profileController.updateProfile);
router.post("/:profileId/files/:fileId", profileController.addFile);
router.delete("/:profileId/files/:fileId", profileController.removeFile);

export default router;