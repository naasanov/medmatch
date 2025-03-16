import MaxBufferSize from "@/utils/maxBufferSize";
import { IsString, IsNotEmpty, IsIn } from "class-validator";

class FileValidator {
  @IsString()
  @IsNotEmpty()
  originalname!: string;

  @IsString()
  @IsIn(["image/jpeg", "image/png", "application/pdf"])
  mimetype!: string;

  @IsNotEmpty()
  @MaxBufferSize(5)
  buffer!: Buffer;
}

export { FileValidator };
