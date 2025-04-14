interface File {
  _id: string;
  name: string;
  type: string;
  data: Buffer;
}

interface User {
  _id: string;
  accessToken?: string;
  first: string;
  last: string;
  email: string;
  password: string;
  profile: {
    bio?: string;
    work?: string;
    research?: string;
    volunteering?: string;
    files?: File[];
  };
  isEmployer: boolean;
  entryDate: Date;
}

export type { User, File };
