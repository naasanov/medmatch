import { IsEmail, IsNotEmpty, IsString } from "class-validator";

class CredentialsValidator {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsString()
  @IsNotEmpty()
  password!: string;
}

export { CredentialsValidator };