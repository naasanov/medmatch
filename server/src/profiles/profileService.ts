import { IProfile, Profile } from "@/models/profile";
import { UpdateQuery } from "mongoose";

class ProfileService {
  async getAllProfiles(): Promise<IProfile[]> {
    return Profile.find();
  }

  async getProfileById(id: string): Promise<IProfile | null> {
    return Profile.findById(id);
  }

  async createProfile(profileData: IProfile): Promise<IProfile> {
    const profile = new Profile(profileData);
    return profile.save();
  }

  async updateProfile(
    id: string,
    profileData: UpdateQuery<IProfile>
  ): Promise<IProfile | null> {
    return Profile.findByIdAndUpdate(id, profileData, {
      new: true,
      runValidators: true,
    });
  }

  async addFile(
    profileId: string,
    fileId: string
  ): Promise<IProfile | null> {
    return Profile.findByIdAndUpdate(
      profileId,
      { $addToSet: { "files": fileId } },
      { new: true, rundvalidators: true },
    );
  }

  async removeFile(profileId: string, fileId: string) {
    return Profile.findByIdAndUpdate(
      profileId,
      { $pull: { "files": fileId } },
      { new: true, runValidators: true }
    );
  }
}

export default ProfileService;
