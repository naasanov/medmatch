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

  async addRecommendation(
    profileId: string,
    recommendationId: string
  ): Promise<IProfile | null> {
    return Profile.findByIdAndUpdate(
      profileId,
      { $addToSet: { "files.recommendations": recommendationId } },
      { new: true, rundvalidators: true }
    );
  }

  async removeRecommendation(profileId: string, recommendationId: string) {
    return Profile.findByIdAndUpdate(
      profileId,
      { $pull: { "files.recommendations": recommendationId } },
      { new: true, runValidators: true }
    );
  }
}

export default ProfileService;
