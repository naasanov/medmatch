import { NotFoundError } from "@/types/errors";
import { ProfileCode } from "@/types/errorCodes";

class ProfileNotFoundError extends NotFoundError {
  constructor(message: string = "Profile not found") {
    super(message, ProfileCode.ProfileNotFound);
  }
}

export { ProfileNotFoundError}