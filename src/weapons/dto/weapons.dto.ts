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

  @IsString()
  @IsNotEmpty()
  readonly condition: string;

  @IsString()
  @IsNotEmpty()
  readonly armType: string;
}

export class CategoryWeaponDto {
  @IsString()
  @IsNotEmpty()
  readonly categoryName: string;
}

export class signoutWeaponDto {
  @IsString()
  @IsNotEmpty()
  readonly weaponId: string;

  @IsString()
  @IsNotEmpty()
  readonly returnDate: string;

  @IsString()
  readonly numRounds: number;
}

export class approveWeaponDto {
  @IsString()
  @IsNotEmpty()
  readonly weaponId: string;
}

export class releaseWeaponDto {
  @IsString()
  @IsNotEmpty()
  readonly weaponId: string;
}

export class retrieveWeaponDto {
  @IsString()
  @IsNotEmpty()
  readonly weaponId: string;

  @IsString()
  @IsNotEmpty()
  readonly condition: string;

  @IsString()
  readonly note: string;
}

export interface UserData {
  name: string;
  serialNumber: string;
  availability: string;
  signoutDate: Date; // Explicitly define the type as Date
  actualSigninDate: Date | null;
  approve: string;
}

export class weaponDto {
  @IsString()
  @IsNotEmpty()
  readonly weaponId: string;
}
