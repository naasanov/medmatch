import bcrypt from "bcrypt";
import { UserService, PopulatedUser } from "@/modules/users";
import { UnauthorizedError } from "@/types/errors";
import jwt from "jsonwebtoken";

class AuthService {
  constructor(private userService: UserService) {}

  async login(email: string, password: string): Promise<PopulatedUser> {
    const user = await this.userService.getUserByEmail(email);
    if (!user) {
      throw new UnauthorizedError(`Invalid email or password`);
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedError("Invalid email or password");
    }
    return user;
  }

  async generateRefreshToken(email: string, id: string): Promise<string> {
    const refreshToken = await jwt.sign(
      { email, id },
      process.env.REFRESH_TOKEN_SECRET!,
      // This should be the same time frame as the cookie max age in auth.controller.ts
      { expiresIn: "7d" }
    );
    return refreshToken;
  }

  async refreshAccessToken(refreshToken: string): Promise<string> {
    let decoded: any;

    try {
      decoded = jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET!
      ) as { email: string; id: string };
    } catch (error) {
      // Refresh token should be valid
      throw new UnauthorizedError("Invalid refresh token");
    }

    if (
      !decoded ||
      typeof decoded !== "object" ||
      typeof decoded.id !== "string" ||
      typeof decoded.email !== "string"
    ) {
      // Token payload should be in the shape of { email: string; id: string }
      throw new UnauthorizedError("Invalid refresh token");
    }

    const { email, id } = decoded as { email: string; id: string };

    const user = await this.userService.getUserById(id);
    if (!user) {  
      // User associated with token should exist
      throw new UnauthorizedError("Invalid refresh token");
    }

    const accessToken = jwt.sign(
      { email, id },
      process.env.JWT_SECRET!,
      { expiresIn: "1h" }
    );
    return accessToken;
  }

  async hashPassword(
    password: string,
    saltRounds: number = 10
  ): Promise<string> {
    return bcrypt.hash(password, saltRounds);
  }
}

export { AuthService };
