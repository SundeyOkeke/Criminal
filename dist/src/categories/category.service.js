"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let CategoryService = class CategoryService {
    constructor(categoryModel, UnitModel) {
        this.categoryModel = categoryModel;
        this.UnitModel = UnitModel;
    }
    async createCategory(data) {
        return await this.categoryModel.create(Object.assign({}, data));
    }
    async createUnit(data) {
        const category = await this.categoryModel.findById(data.categoryId);
        if (!category) {
            throw new common_1.NotFoundException("Category not found");
        }
        const unit = (await this.UnitModel.create(Object.assign(Object.assign({}, data), { category: category._id })));
        category.units.push(unit);
        await category.save();
        return unit;
    }
    async getCategories() {
        return await this.categoryModel.find().populate("units");
    }
    async getUnits() {
        return await this.UnitModel.find().populate("category");
    }
    async findOneUnit(unit) {
        console.log("unit", unit);
        const findunit = await this.UnitModel.findById(unit).populate("category");
        return findunit;
    }
};
exports.CategoryService = CategoryService;
exports.CategoryService = CategoryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)("Category")),
    __param(1, (0, mongoose_1.InjectModel)("Unit")),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], CategoryService);
//# sourceMappingURL=category.service.js.map