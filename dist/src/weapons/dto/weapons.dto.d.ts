export declare class WeaponDto {
    readonly name: string;
    readonly DateOfManufacture: string;
    readonly productionDate: string;
    readonly serialNumber: string;
    readonly condition: string;
    readonly armType: string;
}
export declare class CategoryWeaponDto {
    readonly categoryName: string;
}
export declare class signoutWeaponDto {
    readonly weaponId: string;
    readonly returnDate: string;
    readonly numRounds: number;
}
export declare class approveWeaponDto {
    readonly weaponId: string;
}
export declare class releaseWeaponDto {
    readonly weaponId: string;
}
export declare class retrieveWeaponDto {
    readonly weaponId: string;
    readonly condition: string;
    readonly note: string;
}
export interface UserData {
    name: string;
    serialNumber: string;
    availability: string;
    signoutDate: Date;
    actualSigninDate: Date | null;
    approve: string;
}
export declare class weaponDto {
    readonly weaponId: string;
}
