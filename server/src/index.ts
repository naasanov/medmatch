import "reflect-metadata";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

import { fileRouter } from "@/modules/files";
import { userRouter } from "@/modules/users";
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

function connectionString() {
  const dialect = "mongodb+srv";
  const username = process.env.DB_USERNAME;
  const password = process.env.DB_PASSWORD;
  const host = process.env.DB_HOST;
  const collection = process.env.DB_COLLECTION;
  const cluster = process.env.DB_CLUSTER;

  return `${dialect}://${username}:${password}@${host}/${collection}?retryWrites=true&w=majority&appName=${cluster};`
}

// Database connection
mongoose.connect(connectionString());
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
app.use("/api/users", userRouter);

// Error handler must come last
app.use(errorHandler);

const port = process.env.DEV_PORT || 4000;
app.listen(port, () => {
  console.log(`[server]: Running on port ${port}`);
});
