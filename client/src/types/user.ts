interface File {
  id: string;
  name: string;
  type: "image/jpeg" | "image/png" | "application/pdf";
  data: Buffer;
}

/** Profile object to be used as input for an API request */
interface InputProfile {
  files: string[]; // Array of file IDs
  bio?: string;
  work?: string;
  research?: string;
  volunteering?: string;
}

/** Profile object returned by the backend. */
interface Profile extends Omit<InputProfile, "files"> {
  id: string;
  files: File[];
}

/** 
 * User object to be used as input for an API request.  
 * @defaults `profile` to an empty profile
 * @defaults `entryDate` to the current date
 */
interface InputUser {
  first: string;
  last: string;
  email: string;
  password: string;
  profile?: InputProfile;
  isEmployer: boolean;
  entryDate?: Date;
}

/** User object returned by the backend. */
interface User extends Omit<InputUser, "profile"> {
  id: string;
  profile: Profile;
  entryDate: Date;
}

export type { User, Profile, File, InputUser, InputProfile };
