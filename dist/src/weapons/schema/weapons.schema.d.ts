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
import { Document, Types } from "mongoose";
import { Unit } from "src/categories/schema/unit.schema";
import { User } from "src/user/schema/user.schema";
export declare enum Availability {
    Available = "available",
    SignedOut = "signed out"
}
export declare class Weapon {
    name: string;
    DateOfManufacture: string;
    serialNumber: string;
    productionDate: string;
    availability: Availability;
    unit: Unit;
    users: {
        user: Types.ObjectId | User;
        signoutDate: Date;
        signinDate: Date;
    }[];
}
export type WeaponDocument = Weapon & Document;
export declare const WeaponSchema: import("mongoose").Schema<Weapon, import("mongoose").Model<Weapon, any, any, any, Document<unknown, any, Weapon> & Omit<Weapon & {
    _id: Types.ObjectId;
}, never>, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Weapon, Document<unknown, {}, import("mongoose").FlatRecord<Weapon>> & Omit<import("mongoose").FlatRecord<Weapon> & {
    _id: Types.ObjectId;
}, never>>;
