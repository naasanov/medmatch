import { HandleErrors } from "@/utils/errorHandler";
import { AuthService } from "./auth.service";
import { Request, Response } from "express";

class AuthController {
  constructor(private authService: AuthService) {
    this.login = this.login.bind(this);
  }

  @HandleErrors()
  async login(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;
    const user = await this.authService.login(email, password);
    const refreshToken = await this.authService.generateRefreshToken(
      user.email,
      user._id.toString()
    );
    const accessToken = await this.authService.refreshAccessToken(refreshToken);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      // This should be the same time frame as the refresh
      // token expiration in the generateRefreshToken auth service method
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(200).json({
      status: "success",
      data: { accessToken, ...user },
      message: `User with email ${user.email} logged in successfully`,
    });
  }
}

export { AuthController };
