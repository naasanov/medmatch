import { Router } from "express";
import ProfileController from "@/profiles/profileController";
const router = Router();

const profileController = new ProfileController();

router.get("/", profileController.getAllProfiles);
router.get("/:id", profileController.getProfileById);
router.post("/", profileController.createProfile);
router.put("/:id", profileController.updateProfile);
router.post("/:id/recommendations/:recommendationId", profileController.addRecommendation);
router.delete("/:id/recommendations/:recommendationId", profileController.removeRecommendation);

export default router;