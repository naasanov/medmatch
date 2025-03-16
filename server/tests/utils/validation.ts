import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";

type ClassType<T> = { new (...args: any[]): T };

async function expectMatch<T extends object>(
  classType: ClassType<T>,
  obj: object
) {
  const instance = plainToInstance(classType, obj);
  const errors = await validate(instance);
  expect(errors.length).toBe(0);
}

export { expectMatch };