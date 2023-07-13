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
exports.WeaponsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const weapons_schema_1 = require("./schema/weapons.schema");
const utils_1 = require("../utils/utils");
let WeaponsService = class WeaponsService {
    constructor(weaponModel) {
        this.weaponModel = weaponModel;
    }
    async createWeapon(commanderData, weaponData) {
        const { unitId } = commanderData;
        console.log(unitId);
        return await this.weaponModel.create(Object.assign(Object.assign({}, weaponData), { unit: unitId }));
    }
    async getWeaponsByUnitMem(commanderData) {
        const { unitId } = commanderData;
        console.log(unitId);
        return await this.weaponModel.find({ unit: unitId, availability: "available" });
    }
    async getWeaponsByUnitComm(commanderData) {
        const { unitId } = commanderData;
        console.log(unitId);
        return await this.weaponModel.find({ unit: unitId });
    }
    async getWeaponsByBrigadeComm(data) {
        if (data.categoryName) {
            const { categoryName } = data;
            return await this.weaponModel.aggregate([
                {
                    $lookup: {
                        from: "units",
                        localField: "unit",
                        foreignField: "_id",
                        as: "unit",
                    },
                },
                {
                    $unwind: "$unit",
                },
                {
                    $lookup: {
                        from: "categories",
                        localField: "unit.category",
                        foreignField: "_id",
                        as: "unit.category",
                    },
                },
                {
                    $unwind: "$unit.category",
                },
                {
                    $match: {
                        $or: [{ "unit.category.name": `${categoryName}` }],
                    },
                },
            ]);
        }
        return await this.weaponModel.aggregate([
            {
                $lookup: {
                    from: "units",
                    localField: "unit",
                    foreignField: "_id",
                    as: "unit",
                },
            },
            {
                $unwind: "$unit",
            },
            {
                $lookup: {
                    from: "categories",
                    localField: "unit.category",
                    foreignField: "_id",
                    as: "unit.category",
                },
            },
            {
                $unwind: "$unit.category",
            },
            {
                $match: {
                    $or: [
                        { "unit.category.name": "Brigade" },
                        { "unit.category.name": "Battalion" },
                    ],
                },
            },
        ]);
    }
    async getWeaponsByDivisionComm(data) {
        if (data.categoryName) {
            const { categoryName } = data;
            return await this.weaponModel.aggregate([
                {
                    $lookup: {
                        from: "units",
                        localField: "unit",
                        foreignField: "_id",
                        as: "unit",
                    },
                },
                {
                    $unwind: "$unit",
                },
                {
                    $lookup: {
                        from: "categories",
                        localField: "unit.category",
                        foreignField: "_id",
                        as: "unit.category",
                    },
                },
                {
                    $unwind: "$unit.category",
                },
                {
                    $match: {
                        $or: [{ "unit.category.name": `${categoryName}` }],
                    },
                },
            ]);
        }
        return await this.weaponModel.aggregate([
            {
                $lookup: {
                    from: "units",
                    localField: "unit",
                    foreignField: "_id",
                    as: "unit",
                },
            },
            {
                $unwind: "$unit",
            },
            {
                $lookup: {
                    from: "categories",
                    localField: "unit.category",
                    foreignField: "_id",
                    as: "unit.category",
                },
            },
            {
                $unwind: "$unit.category",
            },
            {
                $match: {
                    $or: [
                        { "unit.category.name": "Brigade" },
                        { "unit.category.name": "Battalion" },
                        { "unit.category.name": "Division" },
                    ],
                },
            },
        ]);
    }
    async signoutWeapon(user, data) {
        const { weaponId, returnDate } = data;
        const { _id: userId } = user;
        const updateData = {
            user: userId,
            signoutDate: new Date(),
            signinDate: (0, utils_1.convertDateFormat)(returnDate)
        };
        const signoutWeapon = await this.weaponModel.findByIdAndUpdate(weaponId, { $push: { users: updateData }, availability: weapons_schema_1.Availability.SignedOut }, { new: true });
        console.log(signoutWeapon);
        return signoutWeapon;
    }
    async getWeaponById(id) {
        return await this.weaponModel.findById(id).populate("unit");
    }
};
WeaponsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)("Weapon")),
    __metadata("design:paramtypes", [mongoose_2.Model])
], WeaponsService);
exports.WeaponsService = WeaponsService;
//# sourceMappingURL=weapons.service.js.map