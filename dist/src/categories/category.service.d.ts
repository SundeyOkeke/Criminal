import { Model } from "mongoose";
import { Category } from "./schema/category.schema";
import { Unit, UnitDocument } from "./schema/unit.schema";
import { CategoryDto } from "./dto/category.dto";
export declare class CategoryService {
    private categoryModel;
    private UnitModel;
    constructor(categoryModel: Model<Category>, UnitModel: Model<Unit>);
    createCategory(data: any): Promise<import("mongoose").Document<unknown, {}, Category, {}> & Category & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    createUnit(data: CategoryDto): Promise<UnitDocument>;
    getCategories(): Promise<(import("mongoose").Document<unknown, {}, Category, {}> & Category & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    getUnits(): Promise<(import("mongoose").Document<unknown, {}, Unit, {}> & Unit & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    findOneUnit(unit: any): Promise<import("mongoose").Document<unknown, {}, Unit, {}> & Unit & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
}
