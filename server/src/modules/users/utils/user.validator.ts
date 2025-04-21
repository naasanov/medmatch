import { Type } from "class-transformer";
import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsBoolean,
  IsDate,
  ValidateNested,
  IsOptional,
  IsDefined,
} from "class-validator";

class ProfileValidator {
  @IsOptional()
  @IsString()
  bio?: string;

  @IsOptional()
  @IsString()
  work?: string;

  @IsOptional()
  @IsString()
  research?: string;

  @IsOptional()
  @IsString()
  volunteering?: string;
}

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

  @IsDefined()
  @ValidateNested()
  @Type(() => ProfileValidator)
  profile!: ProfileValidator;
}

export { UserValidator, ProfileValidator };
