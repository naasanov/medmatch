import jwt from "jsonwebtoken";
import request from "supertest";
import { app } from "@/server";

function getAuthenticatedAgent() {
  const token = jwt.sign(
    {
      email: "lebron@james.com",
      id: "60d21b4667d0d8992e610c85",
    },
    process.env.ACCESS_TOKEN_SECRET!,
    { expiresIn: "1h" }
  );

  const agent = request.agent(app) ;
  agent.auth(token, { type: "bearer" });

  return agent;
}

export { getAuthenticatedAgent };
