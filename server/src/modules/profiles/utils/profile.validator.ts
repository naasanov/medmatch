import { IsString, IsNotEmpty, IsArray, IsMongoId } from "class-validator";
import { Schema } from "mongoose";

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

export { ProfileValidator };
