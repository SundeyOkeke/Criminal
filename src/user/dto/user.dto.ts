import { IsNotEmpty, IsString, IsEmail, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class RegisterDto {
  @ApiProperty({ example: "John Doe" })
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({ example: "SecureP@ssw0rd!", minLength: 8 })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  readonly password: string;

  @ApiProperty({ example: "SN123456" })
  @IsString()
  @IsNotEmpty()
  readonly serviceNumber: string;

  @ApiProperty({ example: "64bbf565f87a1c1f72699db0" })
  @IsString()
  @IsNotEmpty()
  readonly unitId: string;
}

export class LoginDto {
  @ApiProperty({ example: "SN123456" })
  @IsString()
  @IsNotEmpty()
  readonly serviceNumber: string;

  @ApiProperty({ example: "SecureP@ssw0rd!", minLength: 8 })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  readonly password: string;
}

export class AppointDto {
  @ApiProperty({ example: "64bbf565f87a1c1f72699db0" })
  @IsString()
  @IsNotEmpty()
  readonly userId: string;
}

export class userIdDto {
  @ApiProperty({ example: "64bbf565f87a1c1f72699db0" })
  @IsString()
  @IsNotEmpty()
  readonly userId: string;
}
