import ProfileService from "@/modules/profiles/profile.service";
import FileService from "@/modules/files/file.service";
import { Request, Response } from "express";
import { HandleErrors } from "@/utils/errorHandler";

class ProfileController {
  constructor(
    private profileService: ProfileService,
    private fileService: FileService
  ) {}

  @HandleErrors()
  async getAllProfiles(req: Request, res: Response): Promise<void> {
    const profiles = await this.profileService.getAllProfiles();
    res.status(200).json({
      status: "success",
      data: profiles,
      message: "Profiles retrieved successfully",
    });
  }

  @HandleErrors()
  async getProfileById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const profile = await this.profileService.getProfileById(id);
    res.status(200).json({
      status: "success",
      data: profile,
      message: "Profile retrieved successfully",
    });
  }

  @HandleErrors()
  async createProfile(req: Request, res: Response): Promise<void> {
    const profileData = req.body;
    const profile = await this.profileService.createProfile(profileData);
    res.status(201).json({
      status: "success",
      data: profile,
      message: `Profile with id ${profile._id} created successfully`,
    });
  }

  @HandleErrors()
  async updateProfile(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const profileData = req.body;
    const profile = await this.profileService.updateProfile(id, profileData);
    res.status(200).json({
      status: "success",
      data: profile,
      message: "Profile updated successfully",
    });
  }

  @HandleErrors()
  async addFile(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const reqFile = req.file!;
    const file = await this.fileService.createFile({
      name: reqFile.originalname,
      type: reqFile.mimetype,
      data: reqFile.buffer,
    });
    const profile = await this.profileService.addFile(id, file._id!);
    res.status(200).json({
      status: "success",
      data: profile,
      message: "File added successfully",
    });
  }

  @HandleErrors()
  async removeFile(req: Request, res: Response): Promise<void> {
    const { profileId, fileId } = req.params;
    const profile = await this.profileService.removeFile(profileId, fileId);
    res.status(200).json({
      status: "success",
      data: profile,
      message: "File removed successfully",
    });
  }
}

export default ProfileController;
