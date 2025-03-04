import { IProfile, Profile } from "@/models/profile";
import { UpdateQuery } from "mongoose";
import { ProfileNotFoundError } from "@/profiles/profileErrors";
import { Model } from "mongoose";

class ProfileService {
  constructor(private profiles: Model<IProfile>) {}

  async getAllProfiles(): Promise<IProfile[]> {
    return this.profiles.find<IProfile>().populate("files").exec();
  }

  async getProfileById(id: string): Promise<IProfile> {
    const profile = await this.profiles
      .findById<IProfile>(id)
      .populate("files")
      .exec();
    if (!profile) {
      throw new ProfileNotFoundError(`Profile with id ${id} not found`);
    }
    return profile;
  }

  async createProfile(profileData: Partial<IProfile> = {}): Promise<IProfile> {
    const profile = new Profile(profileData);
    return profile.save();
  }

  async updateProfile(
    id: string,
    profileData: UpdateQuery<IProfile>
  ): Promise<IProfile> {
    const profile = await this.profiles
      .findByIdAndUpdate<IProfile>(id, profileData, { new: true })
      .exec();
    if (!profile) {
      throw new ProfileNotFoundError(`Profile with id ${id} not found`);
    }
    return profile;
  }

  async addFile(profileId: string, fileId: string): Promise<IProfile> {
    const profile = await this.profiles.findByIdAndUpdate<IProfile>(
      profileId,
      { $addToSet: { files: fileId } },
      { new: true }
    );
    if (!profile) {
      throw new ProfileNotFoundError(`Profile with id ${profileId} not found`);
    }
    return profile;
  }

  async removeFile(profileId: string, fileId: string) {
    const profile = this.profiles.findByIdAndUpdate<IProfile>(
      profileId,
      { $pull: { files: fileId } },
      { new: true }
    );
    if (!profile) {
      throw new ProfileNotFoundError(`Profile with id ${profileId} not found`);
    }
    return profile;
  }
}

export default ProfileService;
