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
import { Category } from "./category.schema";
import { User } from "src/user/schema/user.schema";
export declare class Unit {
    name: string;
    category: Category;
    users: User[];
    _id: Types.ObjectId;
}
export type UnitDocument = Unit & Document;
export declare const UnitSchema: import("mongoose").Schema<Unit, import("mongoose").Model<Unit, any, any, any, Document<unknown, any, Unit> & Omit<Unit & Required<{
    _id: Types.ObjectId;
}>, never>, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Unit, Document<unknown, {}, import("mongoose").FlatRecord<Unit>> & Omit<import("mongoose").FlatRecord<Unit> & Required<{
    _id: Types.ObjectId;
}>, never>>;
