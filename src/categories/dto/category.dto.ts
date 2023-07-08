import { IsNotEmpty, IsString, IsEmail, MinLength } from "class-validator";

export class CategoryDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly categoryId: string;
}
