import { IsNotEmpty, IsString, IsEmail, MinLength } from "class-validator";

export class WeaponDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly DateOfManufacture: string;

  @IsString()
  @IsNotEmpty()
  readonly productionDate: string;

  @IsString()
  @IsNotEmpty()
  readonly serialNumber: string;
}

export class CategoryWeaponDto {
  @IsString()
  @IsNotEmpty()
  readonly categoryName: string;
}
