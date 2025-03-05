import express, { Request } from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

import fileRouter from "@/files/file.router";
import profileRouter from "@/profiles/profile.router";
import userRouter from "@/users/user.router";
import { errorHandler } from "@/utils/errorHandler";

// Express configuration
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const corsOptions = {
  origin: "*",
  credentails: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Database connection
mongoose.connect(process.env.DB_URI!);
const db = mongoose.connection;

db.on("connected", () => {
  console.log("[database]: Connected");
});

db.on("error", (e) => {
  console.log("[database]: Connection error:", e);
});

// Routes
app.get("/", (req, res) => {
  res.status(200).send("Connected");
});

app.use("/api/files", fileRouter);
app.use("/api/profiles", profileRouter);
app.use("/api/users", userRouter);

// Error handler must come last
app.use(errorHandler);

const port = process.env.DEV_PORT || 4000;
app.listen(port, () => {
  console.log(`[server]: Running on port ${port}`);
});
