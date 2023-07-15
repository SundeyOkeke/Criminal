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
    async getWeaponsByComm(commanderData) {
        const { unitId } = commanderData;
        console.log(unitId);
        return await this.weaponModel.find({ unit: unitId });
    }
    async signoutWeapon(user, data) {
        const { weaponId, returnDate } = data;
        const { _id: userId } = user;
        const updateData = {
            user: userId,
            signoutDate: new Date(),
            signinDate: (0, utils_1.convertDateFormat)(returnDate),
            approve: weapons_schema_1.Approval.AwaitingApproval
        };
        const signoutWeapon = await this.weaponModel.findByIdAndUpdate(weaponId, { $push: { users: updateData }, availability: weapons_schema_1.Availability.SignedOut }, { new: true });
        console.log(signoutWeapon);
        return signoutWeapon;
    }
    async getWeaponById(id) {
        return await this.weaponModel.findById(id).populate("unit");
    }
    async weaponsAwaitApproval(unit) {
        console.log(unit);
        return await this.weaponModel.find({
            unit: unit,
            availability: "signed out",
            "users": {
                $elemMatch: { "approve": weapons_schema_1.Approval.AwaitingApproval }
            }
        });
    }
    async approveWeapon(unit, data) {
        const { weaponId } = data;
        console.log(unit);
        const weapon = await this.weaponModel.findById(weaponId);
        console.log("heyhey");
        if (weapon.unit._id.toString() === unit.toString()) {
            console.log("hey");
            weapon.users.forEach((user) => {
                if (user.approve === weapons_schema_1.Approval.AwaitingApproval) {
                    user.approve = weapons_schema_1.Approval.SignoutApproved;
                }
            });
            await weapon.save();
            return { message: "Successful" };
        }
    }
    async weaponHistory(userId) {
        const weapons = await this.weaponModel.find({ availability: weapons_schema_1.Availability.SignedOut, "users": { $elemMatch: { user: userId } } });
        return weapons;
    }
};
WeaponsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)("Weapon")),
    __metadata("design:paramtypes", [mongoose_2.Model])
], WeaponsService);
exports.WeaponsService = WeaponsService;
//# sourceMappingURL=weapons.service.js.map