import { GeneralCode, ErrorCode } from '@/types/errorCodes';

class CustomError extends Error {
  errorCode: ErrorCode;
  statusCode: number;

  constructor(message: string, errorCode: ErrorCode, statusCode: number) {
    super(message);
    this.errorCode = errorCode;
    this.statusCode = statusCode;
  }
}

class NotFoundError extends CustomError {
  constructor(message: string, errorCode: ErrorCode = GeneralCode.NotFound, statusCode: number = 404, ) {
    super(message, errorCode, statusCode);
  }
}

class ConflictError extends CustomError {
  constructor(message: string, errorCode: ErrorCode = GeneralCode.Conflict, statusCode: number = 409, ) {
    super(message, errorCode, statusCode);
  }
}

export { CustomError, NotFoundError, ConflictError };