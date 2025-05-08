import { CategoryService } from "./category.service";
import { CategoryDto } from "./dto/category.dto";
export declare class CategoryController {
    private categoryService;
    constructor(categoryService: CategoryService);
    createCategory(data: CategoryDto): Promise<import("mongoose").Document<unknown, {}, import("./schema/category.schema").Category, {}> & import("./schema/category.schema").Category & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    createUnit(data: CategoryDto): Promise<import("./schema/unit.schema").UnitDocument>;
    getUnits(): Promise<(import("mongoose").Document<unknown, {}, import("./schema/unit.schema").Unit, {}> & import("./schema/unit.schema").Unit & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    getCategories(): Promise<(import("mongoose").Document<unknown, {}, import("./schema/category.schema").Category, {}> & import("./schema/category.schema").Category & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[]>;
}
