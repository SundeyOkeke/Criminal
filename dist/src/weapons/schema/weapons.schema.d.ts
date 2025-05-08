import { Document, Types } from "mongoose";
import { Unit } from "src/categories/schema/unit.schema";
import { User } from "src/user/schema/user.schema";
export declare class Criminal {
    name: string;
    dob: string;
    lockUpDate: string;
    releaseDate: string;
    bvn: string;
    nin: string;
    address: string;
    phoneNumber: string;
    imageUrl: string;
    unit: Unit;
    users: Types.ObjectId | User;
}
export type CriminalDocument = Criminal & Document;
export declare const WCriminalSchema: import("mongoose").Schema<Criminal, import("mongoose").Model<Criminal, any, any, any, Document<unknown, any, Criminal, any> & Criminal & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Criminal, Document<unknown, {}, import("mongoose").FlatRecord<Criminal>, {}> & import("mongoose").FlatRecord<Criminal> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
