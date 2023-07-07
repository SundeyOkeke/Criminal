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
import { Category } from "./schema/category.schema";
import { Unit } from "./schema/unit.schema";
import { CategoryDto } from "./dto/category.dto";
export declare class CategoryService {
    private categoryModel;
    private UnitModel;
    constructor(categoryModel: Model<Category>, UnitModel: Model<Unit>);
    createCategory(data: any): Promise<import("mongoose").Document<unknown, {}, Category> & Omit<Category & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
    createUnit(data: CategoryDto): Promise<import("mongoose").Document<unknown, {}, Unit> & Omit<Unit & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
    getCategories(): Promise<Omit<import("mongoose").Document<unknown, {}, Category> & Omit<Category & {
        _id: import("mongoose").Types.ObjectId;
    }, never>, never>[]>;
    getUnits(): Promise<Omit<import("mongoose").Document<unknown, {}, Unit> & Omit<Unit & {
        _id: import("mongoose").Types.ObjectId;
    }, never>, never>[]>;
    findOneUnit(unit: any): Promise<import("mongoose").Document<unknown, {}, Unit> & Omit<Unit & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
}
