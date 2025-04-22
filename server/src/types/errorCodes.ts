import { UserCode, ProfileCode } from '@/modules/users';
import { FileCode } from '@/modules/files';

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

const allErrorCodes = [
  ...Object.values(GeneralCode),
  ...Object.values(UserCode),
  ...Object.values(ProfileCode),
  ...Object.values(FileCode),
]

type ErrorCode = typeof allErrorCodes[number];

export { allErrorCodes, MongooseCode, ErrorCode, GeneralCode };
