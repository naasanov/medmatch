import { UserCode, ProfileCode } from "@/types/errorCodes";
import { ConflictError, NotFoundError } from "@/types/errors";

class ProfileNotFoundError extends NotFoundError {
  constructor(message: string = "Profile not found") {
    super(message, ProfileCode.ProfileNotFound);
  }
}

class UserNotFoundError extends NotFoundError {
  constructor(message: string = "User not found") {
    super(message, UserCode.UserNotFound);
  }
}

class UserConflictError extends ConflictError {
  constructor(message: string = "User already exists") {
    super(message, UserCode.UserConflict);
  }
}

export { UserNotFoundError, UserConflictError, ProfileNotFoundError };
