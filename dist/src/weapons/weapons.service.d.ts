import { Model } from "mongoose";
import { Weapon } from "./schema/weapons.schema";
import { UserData } from "./dto/weapons.dto";
export declare class WeaponsService {
    private weaponModel;
    constructor(weaponModel: Model<Weapon>);
    createWeapon(commanderData: any, weaponData: any): Promise<any>;
    getWeaponsByUnitMem(commanderData: any): Promise<any[]>;
    getWeaponsByComm(commanderData: any): Promise<any[]>;
    signoutWeapon(user: any, data: any): Promise<any>;
    getWeaponById(id: any): Promise<any>;
    weaponsAwaitApproval(unit: any): Promise<any[]>;
    weaponsAwaitRelease(unit: any): Promise<any[]>;
    releasedWeapons(unit: any): Promise<any[]>;
    approveWeapon(commUser: any, data: any): Promise<{
        message: string;
    }>;
    releaseWeapon(amourer: any, data: any): Promise<{
        message: string;
    }>;
    retrieveWeapon(amourer: any, data: any): Promise<{
        message: string;
    }>;
    weaponHistory(userId: any): Promise<UserData[]>;
    getUnitWeapons(unitId: any): Promise<any[]>;
    allWeapons(): Promise<any[]>;
    getWeaponByArmType(user: any, armType: any): Promise<any>;
}
