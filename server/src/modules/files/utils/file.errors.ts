import { ConflictError, NotFoundError } from "@/types/errors";
import { FileCode } from "@/types/errorCodes";

class FileNotFoundError extends NotFoundError {
  constructor(message: string = "File not found") {
    super(message, FileCode.FileNotFound);
  }
}

class FileConflictError extends ConflictError {
  constructor(message: string = "File already exists") {
    super(message, FileCode.FileConflict);
  }
}

export { FileNotFoundError, FileConflictError };
