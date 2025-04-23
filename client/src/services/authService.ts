import { authClient } from "@/lib/authClient";
import { isSuccess, ResponseBody } from "@/types/responses";
import { InputUser, User } from "@/types/user";

/**
 * Authenticates a user based on email and password, returning null if authentication fails, and returning the user object if successful.
 * @param email - The email of the user.
 * @param password - The password of the user.
 * @returns null if authentication fails, or the user object if successful
 */
async function login(email: string, password: string): Promise<User | null> {
  try {
    const { data: body } = await authClient.post<ResponseBody<User>>(
      "/api/auth/login",
      {
        email,
        password,
      }
    );
    return isSuccess(body) ? body.data : null;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return null;
  }
}

/**
 * Signs up a new user with the provided user data
 * @param userData - The data of the user to sign up.
 * @returns null if the signup fails, or the user object if successful
 */
async function signup(userData: InputUser): Promise<User | null> {
  try {
    const { data: body } = await authClient.post<ResponseBody<User>>(
      "/api/auth/login",
      userData
    );
    return isSuccess(body) ? body.data : null;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return null
  }
}

async function logout(): Promise<void> {
  try {
    await authClient.post("/api/auth/logout");
  } catch (error) {
    console.error("Logout failed", error);
  }
}

export { login, signup, logout };
