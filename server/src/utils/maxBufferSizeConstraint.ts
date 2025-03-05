import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";

@ValidatorConstraint({ name: "MaxBufferSize", async: false })
class maxBufferSizeConstraint implements ValidatorConstraintInterface {
  validate(buffer: Buffer, args: ValidationArguments) {
    return buffer.length <= (args.constraints[0] as number) * 1024 * 1024; // 16MB
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
      validator: maxBufferSizeConstraint,
    })
  }
}

export default MaxBufferSize;