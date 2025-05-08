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
        return await this.weaponModel.create(Object.assign(Object.assign({}, weaponData), { unit: unitId }));
    }
    async getWeaponsByUnitMem(commanderData) {
        const { unitId } = commanderData;
        return await this.weaponModel.find({
            unit: unitId,
            availability: "available",
            condition: weapons_schema_1.Condition.Good,
        });
    }
    async getWeaponsByComm(commanderData) {
        const { unitId } = commanderData;
        return await this.weaponModel.find({ unit: unitId });
    }
    async signoutWeapon(user, data) {
        const { weaponId, returnDate, numRounds } = data;
        const { _id: userId } = user;
        const updateData = {
            user: userId,
            signoutDate: new Date(),
            proposedSigninDate: (0, utils_1.convertDateTimeFormat)(returnDate),
            approve: weapons_schema_1.Approval.AwaitingApproval,
            actualSigninDate: "",
            approvedBy: null,
            releasedBy: null,
            retrievedBy: null,
            numRounds: numRounds
        };
        const signoutWeapon = await this.weaponModel.findByIdAndUpdate(weaponId, { $push: { users: updateData }, availability: weapons_schema_1.Availability.SignedOut }, { new: true });
        return signoutWeapon;
    }
    async getWeaponById(id) {
        return await this.weaponModel
            .findById(id)
            .populate("unit")
            .populate("users.user")
            .populate("users.approvedBy")
            .populate("users.releasedBy")
            .populate("users.retrievedBy");
    }
    async weaponsAwaitApproval(unit) {
        return await this.weaponModel
            .find({
            unit: unit,
            availability: "signed out",
            users: {
                $elemMatch: { approve: weapons_schema_1.Approval.AwaitingApproval },
            },
        })
            .populate("users.user");
    }
    async weaponsAwaitRelease(unit) {
        return await this.weaponModel
            .find({
            unit: unit,
            availability: "signed out",
            users: {
                $elemMatch: { approve: weapons_schema_1.Approval.AwaitingRelease },
            },
        })
            .populate("users.user");
    }
    async releasedWeapons(unit) {
        return await this.weaponModel
            .find({
            unit: unit,
            availability: "signed out",
            users: {
                $elemMatch: { approve: weapons_schema_1.Approval.Released },
            },
        })
            .populate("users.user");
    }
    async approveWeapon(commUser, data) {
        const { weaponId } = data;
        const { _id: userId } = commUser;
        const weapon = await this.weaponModel.findById(weaponId);
        if (weapon.unit._id.toString() === commUser.unit._id.toString()) {
            weapon.users.forEach((user) => {
                if (user.approve === weapons_schema_1.Approval.AwaitingApproval) {
                    user.approve = weapons_schema_1.Approval.AwaitingRelease;
                    user.approvedBy = userId;
                }
            });
            await weapon.save();
            return { message: "Successful" };
        }
    }
    async releaseWeapon(amourer, data) {
        const { weaponId } = data;
        const { _id: userId } = amourer;
        const weapon = await this.weaponModel.findById(weaponId);
        if (weapon.unit._id.toString() === amourer.unit._id.toString()) {
            console.log("hey");
            weapon.users.forEach((user) => {
                if (user.approve === weapons_schema_1.Approval.AwaitingRelease) {
                    user.approve = weapons_schema_1.Approval.Released;
                    user.releasedBy = userId;
                }
            });
            await weapon.save();
            return { message: "Successful" };
        }
        console.log("hey");
    }
    async retrieveWeapon(amourer, data) {
        const { weaponId, condition, note } = data;
        const { _id: userId } = amourer;
        const weapon = await this.weaponModel.findById(weaponId);
        if (weapon.unit._id.toString() === amourer.unit._id.toString()) {
            if (condition === weapons_schema_1.Availability.Missing) {
                weapon.users.forEach((user) => {
                    if (user.approve === weapons_schema_1.Approval.Released) {
                        user.actualSigninDate = new Date();
                        user.retrievedBy = userId;
                        user.note = note;
                    }
                });
                (weapon.availability = weapons_schema_1.Availability.Missing), await weapon.save();
                return { message: "Successful" };
            }
            weapon.users.forEach((user) => {
                if (user.approve === weapons_schema_1.Approval.Released) {
                    user.approve = weapons_schema_1.Approval.SigninApproved;
                    user.actualSigninDate = new Date();
                    user.retrievedBy = userId;
                    user.note = note;
                }
            });
            (weapon.availability = weapons_schema_1.Availability.Available),
                (weapon.condition = condition);
            await weapon.save();
            return { message: "Successful" };
        }
    }
    async weaponHistory(userId) {
        const weapons = await this.weaponModel.find({
            $or: [
                { availability: weapons_schema_1.Availability.SignedOut, "users.user": userId },
                { availability: weapons_schema_1.Availability.Available, "users.user": userId },
                { availability: weapons_schema_1.Availability.Missing, "users.user": userId },
            ],
        });
        const filteredWeapons = weapons.map((weapon) => {
            const usersData = weapon.users
                .filter((user) => user.user.toString() === userId.toString())
                .map((user) => ({
                name: weapon.name,
                serialNumber: weapon.serialNumber,
                availability: weapon.availability,
                signoutDate: user.signoutDate,
                actualSigninDate: user.actualSigninDate,
                approve: user.approve,
            }));
            return usersData;
        });
        const flattenedWeapons = filteredWeapons
            .flat()
            .sort((a, b) => {
            return (new Date(a.signoutDate).getTime() - new Date(b.signoutDate).getTime());
        });
        return flattenedWeapons;
    }
    async getUnitWeapons(unitId) {
        return await this.weaponModel.find({ unit: unitId }).populate("unit");
    }
    async allWeapons() {
        return await this.weaponModel
            .find()
            .populate("unit")
            .populate("users.user")
            .populate("users.approvedBy")
            .populate("users.releasedBy")
            .populate("users.retrievedBy");
    }
    async getWeaponByArmType(user, armType) {
        const weapons = await this.weaponModel.find({
            armType: armType,
            unit: user,
            availability: "available",
            condition: weapons_schema_1.Condition.Good,
        });
        console.log(weapons);
        if (weapons.length > 1) {
            const randomIndex = Math.floor(Math.random() * weapons.length);
            return weapons[randomIndex];
        }
        else if (weapons.length === 1) {
            return weapons[0];
        }
        else {
            return null;
        }
    }
};
exports.WeaponsService = WeaponsService;
exports.WeaponsService = WeaponsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)("Weapon")),
    __metadata("design:paramtypes", [mongoose_2.Model])
], WeaponsService);
//# sourceMappingURL=weapons.service.js.map