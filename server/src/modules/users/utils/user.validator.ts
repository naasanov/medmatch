import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsBoolean,
  IsDate,
} from "class-validator";

class UserValidator {
  @IsString()
  @IsNotEmpty()
  first!: string;

  @IsString()
  @IsNotEmpty()
  last!: string;

  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsString()
  @IsNotEmpty()
  password!: string;

  @IsBoolean()
  isEmployer!: boolean;

  @IsDate()
  @IsNotEmpty()
  entryDate!: Date;
}

export { UserValidator };
