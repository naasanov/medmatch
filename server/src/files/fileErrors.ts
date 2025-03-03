import { NotFoundError } from "@/types/errors";
import { FileCode } from "@/types/errorCodes";

class FileNotFoundError extends NotFoundError {
  constructor(message: string = "File not found") {
    super(message, FileCode.FileNotFound);
  }
}

export { FileNotFoundError}