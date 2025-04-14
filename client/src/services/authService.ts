import { apiClient } from "@/lib/apiClient";
import { isSuccess, ResponseBody } from "@/types/responses";
import { User } from "@/types/user";

/**
 * Authenticates a user based on email and password, returning null if authentication fails, and returning the user object if successful.
 * @param email - The email of the user.
 * @param password - The password of the user.
 */
async function login(email: string, password: string): Promise<User | null> {
  try {
    const { data: body } = await apiClient.post<ResponseBody<User>>(
      "/api/users/auth/login",
      {
        email,
        password,
      }
    );
    return isSuccess(body) ? body.data : null;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return null
  }
}

export { login };
