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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("./schema/user.schema");
const jwt_1 = require("@nestjs/jwt");
const category_service_1 = require("../categories/category.service");
const weapons_service_1 = require("../weapons/weapons.service");
let AuthService = class AuthService {
    constructor(userModel, jwtService, categoryService, weaponsService) {
        this.userModel = userModel;
        this.jwtService = jwtService;
        this.categoryService = categoryService;
        this.weaponsService = weaponsService;
    }
    async register(data) {
        const { name, serviceNumber, unit } = data;
        if (unit) {
            const user = await this.userModel.findOne({ serviceNumber });
            if (user) {
                throw new common_1.UnauthorizedException("Service Number already exists");
            }
            const userUnit = await this.categoryService.findOneUnit(unit);
            console.log(userUnit);
            const createUser = await this.userModel.create({
                name,
                serviceNumber,
                unit: userUnit._id,
                categoryName: userUnit.category.name,
            });
            return createUser;
        }
        console.log("hey", data);
        const createUser = await this.userModel.create({
            name: name,
            serviceNumber: serviceNumber,
            role: user_schema_1.UserRole.SuperAdmin,
        });
        return createUser;
    }
    async login(data) {
        const { serviceNumber } = data;
        const user = await this.userModel
            .findOne({ serviceNumber })
            .populate("unit");
        console.log(user);
        if (!user) {
            throw new common_1.UnauthorizedException("User not found");
        }
        const payload = {
            id: user._id,
            category: user.categoryName,
            role: user.role,
        };
        const token = this.jwtService.sign(payload);
        return { token, user };
    }
    async appointDivisionComm(id, data) {
        const { userId } = data;
        const user = await this.userModel.findById(id);
        if (user.role === "super admin") {
            console.log("hey");
            const user = await this.userModel.findById(userId);
            if (user.categoryName === "Division") {
                await this.userModel.findByIdAndUpdate(userId, {
                    role: user_schema_1.UserRole.DivisionCommander,
                });
                return { message: "Successful" };
            }
        }
    }
    async appointBrigadeComm(id, data) {
        const { userId } = data;
        const user = await this.userModel.findById(id);
        if (user.role === "super admin") {
            console.log("hey");
            const user = await this.userModel.findById(userId);
            console.log(user);
            if (user.categoryName === "Brigade") {
                await this.userModel.findByIdAndUpdate(userId, {
                    role: user_schema_1.UserRole.BrigadeCommander,
                });
                return { message: "Successful" };
            }
        }
    }
    async appointBattalionComm(id, data) {
        const { userId } = data;
        const user = await this.userModel.findById(id);
        if (user.role === "brigade commander" ||
            user.role === "division commander" ||
            user.role === "super admin") {
            console.log("hey");
            const user = await this.userModel.findById(userId).populate("unit");
            console.log(user);
            if (user.categoryName === "Battalion" ||
                user.categoryName === "Brigade" ||
                user.categoryName === "Division") {
                await this.userModel.findByIdAndUpdate(userId, {
                    role: user_schema_1.UserRole.UnitCommander,
                });
                return {
                    message: `${user.serviceNumber} successfully appointed as ${user.unit.name} unit commander `,
                };
            }
        }
    }
    async registerWeapon(id, weaponData) {
        const user = await this.userModel.findById(id).populate("unit");
        if (user.role === "unit commander") {
            const commanderData = {
                unitId: user.unit._id,
            };
            console.log(commanderData);
            return await this.weaponsService.createWeapon(commanderData, weaponData);
        }
    }
    async getWeapons(id, data) {
        const user = await this.userModel.findById(id).populate("unit");
        if (user.role === "unit member") {
            const userData = {
                unitId: user.unit._id,
            };
            return await this.weaponsService.getWeaponsByUnitMem(userData);
        }
        if (user.role === "unit commander") {
            const commanderData = {
                unitId: user.unit._id,
            };
            return await this.weaponsService.getWeaponsByUnitComm(commanderData);
        }
        if (user.role === "brigade commander") {
            return await this.weaponsService.getWeaponsByBrigadeComm(data);
        }
        if (user.role === "division commander") {
            return await this.weaponsService.getWeaponsByDivisionComm(data);
        }
    }
    async signoutWeapon(id, data) {
        const { weaponId, returnDate } = data;
        const user = await this.userModel.findById(id).populate("unit");
        const weapon = await this.weaponsService.getWeaponById(weaponId);
        console.log(user.unit._id);
        console.log(weapon.unit._id);
        if (user.unit._id.toString() === weapon.unit._id.toString()) {
            console.log("hey");
            return await this.weaponsService.signoutWeapon(user, data);
        }
        throw new common_1.UnauthorizedException("Unauthorised");
    }
    async decodeToken(token) {
        try {
            const decoded = this.jwtService.verify(token);
            return decoded;
        }
        catch (err) {
            console.error(err);
            return null;
        }
    }
    async getUserById(id) {
        return await this.userModel.findById(id).populate("unit");
    }
    async weaponsAwaitApproval(id) {
        const user = await this.userModel.findById(id).populate("unit");
        return await this.weaponsService.weaponsAwaitApproval(user.unit._id);
    }
    async approveWeapon(id, data) {
        const user = await this.userModel.findById(id).populate("unit");
        if (user.role === "unit commander") {
            return await this.weaponsService.approveWeapon(user.unit._id, data);
        }
    }
    async weaponHistory(id) {
        const user = await this.userModel.findById(id);
        return await this.weaponsService.weaponHistory(user._id);
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        jwt_1.JwtService,
        category_service_1.CategoryService,
        weapons_service_1.WeaponsService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map