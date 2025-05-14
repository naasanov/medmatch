import {
  InputUser,
  User,
  UserDoc,
  UserModel,
} from "@/modules/users";
import { File, FileModel } from "@/modules/files";


async function createTestFile(data?: Partial<File>): Promise<File> {
  const defaultFile: Omit<File, "id"> = {
    type: "image/png",
    name: `Test-${Date.now()}`,
    data: Buffer.from("test data"),
  };

  const fileData = {
    ...defaultFile,
    ...data,
  };

  const file = new FileModel(fileData);
  const doc = await file.save();
  return File.fromDoc(doc);
}

async function defaultUserData(): Promise<InputUser> {
  const testFile = await createTestFile();
  return {
    first: `Test-${Date.now()}`,
    last: `User-${Date.now()}`,
    email: `test-${Date.now()}@example.com`,
    password: "password123",
    isEmployer: false,
    profile: {
      bio: "Test bio",
      files: [testFile.id],
    },
    entryDate: new Date(),
  };
}

async function createTestUser(data?: Partial<InputUser>): Promise<User> {
  const defaultUser = await defaultUserData();

  const userData = {
    ...defaultUser,
    ...data,
  };

  const user = new UserModel(userData);
  await user.save();
  const populated: UserDoc = await user.populate("profile.files");
  return User.fromDoc(populated);
}

async function createUnpopulatedTestUser(
  data?: Partial<InputUser>
): Promise<InputUser & { id: string }> {
  const defaultUser = await defaultUserData();

  const userData = {
    ...defaultUser,
    ...data,
  };

  const user = new UserModel(userData);
  await user.save();
  return {
    ...userData,
    id: user._id.toString(),
  };
}

export { 
  createTestFile,
  defaultUserData,
  createTestUser,
  createUnpopulatedTestUser,
}