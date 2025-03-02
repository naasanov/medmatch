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
  UserAlreadyExists = 'USER_ALREADY_EXISTS',
  InvalidCredentials = 'INVALID_CREDENTIALS',
}

enum ProfileCode {
  ProfileNotFound = 'PROFILE_NOT_FOUND',
}

enum FileCode {
  FileNotFound = 'FILE_NOT_FOUND',
}

type ErrorCode = GeneralCode | UserCode | ProfileCode | FileCode;

export { ErrorCode, GeneralCode, UserCode, ProfileCode, FileCode };