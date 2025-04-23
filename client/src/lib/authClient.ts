import axios from "axios";

/**
 * A custom axios instance for making authentication related API requests to the backend.
 */
const authClient = axios.create({
  baseURL: process.env.API_BASE_URL || "",
  headers: {
    "Content-Type": "application/json",
  },
});

export { authClient };
