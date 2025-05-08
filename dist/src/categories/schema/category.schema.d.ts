import { Document, Types } from "mongoose";
import { Unit } from "./unit.schema";
export declare class Category {
    name: string;
    units: Unit[];
}
export type CategoryDocument = Category & Document;
export declare const CategorySchema: import("mongoose").Schema<Category, import("mongoose").Model<Category, any, any, any, Document<unknown, any, Category, any> & Category & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Category, Document<unknown, {}, import("mongoose").FlatRecord<Category>, {}> & import("mongoose").FlatRecord<Category> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
