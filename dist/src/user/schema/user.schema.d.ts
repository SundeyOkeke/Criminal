import { Document } from "mongoose";
import { Unit } from "src/categories/schema/unit.schema";
export declare enum UserRole {
    UnitMember = "Unit Member",
    UnitCommander = "Unit Commander",
    BrigadeCommander = "Brigade Commander",
    DivisionCommander = "Division Commander",
    SuperAdmin = "Super Admin",
    Amourer = "Amourer"
}
export declare class User {
    name: string;
    password: string;
    serviceNumber: string;
    unit: Unit;
    categoryName: string;
    role: UserRole;
    _id: any | User;
}
export type UserDocument = User & Document;
export declare const UserSchema: import("mongoose").Schema<User, import("mongoose").Model<User, any, any, any, Document<unknown, any, User, any> & User & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, User, Document<unknown, {}, import("mongoose").FlatRecord<User>, {}> & import("mongoose").FlatRecord<User> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
