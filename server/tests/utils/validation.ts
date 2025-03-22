import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import mongoose from "mongoose";

type ClassType<T> = { new (...args: any[]): T };

async function expectMatch<T extends object>(
  classType: ClassType<T>,
  obj: object
) {
  // If obj is a Mongoose document, convert it to a plain object
  const plainObj =
    obj instanceof mongoose.Model || typeof (obj as any).toObject === "function"
      ? (obj as any).toObject()
      : obj;
  const instance = plainToInstance(classType, plainObj);
  const errors = await validate(instance);
  expect(errors.length).toBe(0);
}

export { expectMatch };
