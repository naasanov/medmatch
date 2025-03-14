import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsBoolean,
  IsDate,
  IsArray,
  IsMongoId,
} from "class-validator";
import { Schema } from "mongoose";

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

class ProfileValidator {
  @IsString()
  @IsNotEmpty()
  bio!: string;

  @IsString()
  @IsNotEmpty()
  work!: string;

  @IsString()
  @IsNotEmpty()
  research!: string;

  @IsString()
  @IsNotEmpty()
  volunteering!: string;

  @IsArray()
  @IsMongoId({ each: true })
  files!: Schema.Types.ObjectId[];
}

export { UserValidator, ProfileValidator };
