import { IsNotEmpty, IsString, IsEmail, MinLength } from "class-validator";

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly serviceNumber: string;

  @IsString()
  @IsNotEmpty()
  readonly unit: string;
}

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  readonly serviceNumber: string;
}

export class AppointCommDto {
  @IsString()
  @IsNotEmpty()
  readonly userId: string;
}

export class userIdDto {
  @IsString()
  @IsNotEmpty()
  readonly userId: string;

}