enum MongooseCode {
  DuplicateKey = 11000,
}

enum GeneralCode {
  NotFound = 'NOT_FOUND',
  Unauthorized = 'UNAUTHORIZED',
  Forbidden = 'FORBIDDEN',
  BadRequest = 'BAD_REQUEST',
  InternalServerError = 'INTERNAL_SERVER_ERROR',
  Conflict = 'CONFLICT',
}

enum UserCode {
  UserNotFound = 'USER_NOT_FOUND',
  UserConflict = 'USER_CONFLICT',
  InvalidCredentials = 'INVALID_CREDENTIALS',
}

enum ProfileCode {
  ProfileNotFound = 'PROFILE_NOT_FOUND',
}

enum FileCode {
  FileNotFound = 'FILE_NOT_FOUND',
  FileConflict = 'FILE_CONFLICT',
}

const allErrorCodes = [
  ...Object.values(GeneralCode),
  ...Object.values(UserCode),
  ...Object.values(ProfileCode),
  ...Object.values(FileCode),
]

type ErrorCode = typeof allErrorCodes[number];

export { allErrorCodes, MongooseCode, ErrorCode, GeneralCode, UserCode, ProfileCode, FileCode };