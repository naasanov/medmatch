import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

import profileRouter from "@/profiles/profileRoute";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const corsOptions = {
  origin: '*',
  credentails: true,
  optionSuccessStatus: 200
};
app.use(cors(corsOptions));

mongoose.connect(process.env.DB_URI!);
const db = mongoose.connection;

db.on("connected", () => {
  console.log("[database]: Connected");
});

db.on("error", (e) => {
  console.log("[database]: Connection error:", e);
});

app.get('/', (req, res) => {
  res.status(200).send("Connected");
})

app.use('/profiles', profileRouter);

const port = process.env.DEV_PORT || 4000;
app.listen(port, () => {
  console.log(`[server]: Running on port ${port}`);
});