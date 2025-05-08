import { Document, Types } from "mongoose";
import { Category } from "./category.schema";
import { User } from "src/user/schema/user.schema";
export declare class Unit {
    name: string;
    category: Category;
    users: User[];
    _id: Types.ObjectId;
}
export type UnitDocument = Unit & Document;
export declare const UnitSchema: import("mongoose").Schema<Unit, import("mongoose").Model<Unit, any, any, any, Document<unknown, any, Unit, any> & Unit & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Unit, Document<unknown, {}, import("mongoose").FlatRecord<Unit>, {}> & import("mongoose").FlatRecord<Unit> & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}>;
