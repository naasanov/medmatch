import { apiClient } from "@/lib/apiClient";
import { ResponseBody } from "@/types/responses";
import { User } from "@/types/user";

async function login(email: string, password: string): Promise<User | null> {
  const { data: body } = await apiClient.post<ResponseBody<User>>(
    "/api/users/auth/login",
    {
      email,
      password,
    }
  );
  return body.status === "error" ? null : body.data;
}

export { login };
