"use client";

// import { apiClient } from "@/lib/apiClient";
import { useState } from "react";
import axios, { isAxiosError } from "axios";
import { ResponseBody } from "@/types/responses";
import { User } from "@/types/user";
import { useSession } from "next-auth/react";

export default function Test() {
  const [data, setData] = useState<string>("nothing done yet");
  const { data: session } = useSession();
  console.log(session?.accessToken);

  async function func() {
    try {
      const { data: body } = await axios.get<ResponseBody<User[]>>(
        "http://localhost:4000/api/users",
        {
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
          },
        }
      );
      if (body.status === "success") {
        setData(JSON.stringify(body.data));
      } else {
        setData("error");
      }
    } catch (error: unknown) {
      if (!isAxiosError(error)) {
        setData("unknown error");
      } else {
        if (error.response?.status === 401) {
          setData("unauthorized");
        } else {
          setData("http error");
        }
      }
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <button className="bg-slate-500" onClick={() => func()}>
        test auth
      </button>
      <div>{data}</div>
    </div>
  );
}
