import { IsNotEmpty, IsString, IsDateString, IsMongoId } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateCriminalDto {
  @ApiProperty({ example: "John Doe" })
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({ example: "1990-05-20" })
  @IsDateString()
  @IsNotEmpty()
  readonly dob: string;

  @ApiProperty({ example: "2025-01-10" })
  @IsDateString()
  @IsNotEmpty()
  readonly lockUpDate: string;

  @ApiProperty({ example: "2025-12-10" })
  @IsDateString()
  @IsNotEmpty()
  readonly releaseDate: string;

  @ApiProperty({ example: "12345678901" })
  @IsString()
  @IsNotEmpty()
  readonly bvn: string;

  @ApiProperty({ example: "12345678901" })
  @IsString()
  @IsNotEmpty()
  readonly nin: string;

  @ApiProperty({ example: "123 Criminal Street, Lagos" })
  @IsString()
  @IsNotEmpty()
  readonly address: string;

  @ApiProperty({ example: "+2348012345678" })
  @IsString()
  @IsNotEmpty()
  readonly phoneNumber: string;

  @ApiProperty({ example: "https://example.com/image.jpg" })
  @IsString()
  @IsNotEmpty()
  readonly imageUrl: string;

}
