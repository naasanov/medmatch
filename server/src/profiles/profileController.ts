import ProfileService from "@/profiles/profileService";
import { Request, Response } from "express";
import asyncHandler from "@/utils/asyncHandler";
import { ProfileCode } from "@/types/errors";

class ProfileController {
  private profileService: ProfileService;

  constructor() {
    this.profileService = new ProfileService();
  }

  getAllProfiles = asyncHandler(async (req: Request, res: Response) => {
    const profiles = await this.profileService.getAllProfiles();
    res.status(200).json({
      status: "success",
      data: profiles,
      message: "Profiles retrieved successfully",
    });
  });

  getProfileById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const profile = await this.profileService.getProfileById(id);
    if (!profile) {
      return res.status(404).json({
        status: "error",
        errors: [
          { details: "Profile not found", code: ProfileCode.ProfileNotFound },
        ],
      });
    }
    res.status(200).json({
      status: "success",
      data: profile,
      message: "Profile retrieved successfully",
    });
  });

  createProfile = asyncHandler(async (req: Request, res: Response) => {
    const profileData = req.body;
    const profile = await this.profileService.createProfile(profileData);
    res.status(201).json({
      status: "success",
      data: profile,
      message: "Profile created successfully",
    });
  });

  updateProfile = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const profileData = req.body;
    const profile = await this.profileService.updateProfile(id, profileData);
    if (!profile) {
      return res.status(404).json({
        status: "error",
        errors: [
          { details: "Profile not found", code: ProfileCode.ProfileNotFound },
        ],
      });
    }
    res.status(200).json({
      status: "success",
      data: profile,
      message: "Profile updated successfully",
    });
  });

  addRecommendation = asyncHandler(async (req: Request, res: Response) => {
    const { profileId, recommendationId } = req.params;
    const profile = await this.profileService.addRecommendation(
      profileId,
      recommendationId
    );
    if (!profile) {
      return res.status(404).json({
        status: "error",
        errors: [
          { details: "Profile not found", code: ProfileCode.ProfileNotFound },
        ],
      });
    }
    res.status(200).json({
      status: "success",
      data: profile,
      message: "Recommendation added successfully",
    });
  });

  removeRecommendation = asyncHandler(async (req: Request, res: Response) => {
    const { profileId, recommendationId } = req.params;
    const profile = await this.profileService.removeRecommendation(
      profileId,
      recommendationId
    );
    if (!profile) {
      return res.status(404).json({
        status: "error",
        errors: [
          { details: "Profile not found", code: ProfileCode.ProfileNotFound },
        ],
      });
    }
    res.status(200).json({
      status: "success",
      data: profile,
      message: "Recommendation removed successfully",
    });
  });
}

export default ProfileController;
