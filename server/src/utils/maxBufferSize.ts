import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";

import { Binary } from "mongodb";

@ValidatorConstraint({ name: "MaxBufferSize", async: false })
class maxBufferSizeConstraint implements ValidatorConstraintInterface {
  validate(buffer: Buffer | Binary, args: ValidationArguments) {
    if (buffer === undefined || buffer === null) {
      return false;
    }
    const length = buffer instanceof Binary ? buffer.length() : buffer.length;
    return length <= (args.constraints[0] as number) * 1024 * 1024;
  }

  defaultMessage(args: ValidationArguments) {
    return `File size must be ${args.constraints[0]}MB or less`;
  }
}

function MaxBufferSize(maxMB: number, options?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options,
      constraints: [maxMB],
      validator: maxBufferSizeConstraint,
    });
  };
}

export default MaxBufferSize;
