import { IsNotEmpty, IsString, IsEmail, MinLength, IsUUID, IsArray } from "class-validator";
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

export class CreateReportDto {
  @ApiProperty({ example: "This is a report description." })
  @IsString()
  @IsNotEmpty()
  readonly report: string;

  @ApiProperty({ example: ["550e8400-e29b-41d4-a716-446655440000", "550e8400-e29b-41d4-a716-446655440001"] })
  @IsArray()
  @IsNotEmpty()
  @IsUUID("4", { each: true })
  readonly reportToIds: string[];
}