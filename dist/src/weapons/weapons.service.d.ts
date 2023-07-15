/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { Model } from "mongoose";
import { Weapon } from "./schema/weapons.schema";
export declare class WeaponsService {
    private weaponModel;
    constructor(weaponModel: Model<Weapon>);
    createWeapon(commanderData: any, weaponData: any): Promise<import("mongoose").Document<unknown, {}, Weapon> & Omit<Weapon & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
    getWeaponsByUnitMem(commanderData: any): Promise<(import("mongoose").Document<unknown, {}, Weapon> & Omit<Weapon & {
        _id: import("mongoose").Types.ObjectId;
    }, never>)[]>;
    getWeaponsByComm(commanderData: any): Promise<(import("mongoose").Document<unknown, {}, Weapon> & Omit<Weapon & {
        _id: import("mongoose").Types.ObjectId;
    }, never>)[]>;
    signoutWeapon(user: any, data: any): Promise<import("mongoose").Document<unknown, {}, Weapon> & Omit<Weapon & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
    getWeaponById(id: any): Promise<import("mongoose").Document<unknown, {}, Weapon> & Omit<Weapon & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
    weaponsAwaitApproval(unit: any): Promise<(import("mongoose").Document<unknown, {}, Weapon> & Omit<Weapon & {
        _id: import("mongoose").Types.ObjectId;
    }, never>)[]>;
    approveWeapon(unit: any, data: any): Promise<{
        message: string;
    }>;
    weaponHistory(userId: any): Promise<(import("mongoose").Document<unknown, {}, Weapon> & Omit<Weapon & {
        _id: import("mongoose").Types.ObjectId;
    }, never>)[]>;
}
