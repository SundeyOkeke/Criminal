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
const utils_1 = require("../utils/utils");
let AuthService = class AuthService {
    constructor(userModel, jwtService, categoryService, weaponsService) {
        this.userModel = userModel;
        this.jwtService = jwtService;
        this.categoryService = categoryService;
        this.weaponsService = weaponsService;
    }
    async register(data) {
        const { name, serviceNumber, unit, password } = data;
        if (unit) {
            const user = await this.userModel.findOne({ serviceNumber });
            if (user) {
                throw new common_1.UnauthorizedException("Service Number already exists");
            }
            const userUnit = await this.categoryService.findOneUnit(unit);
            console.log(userUnit);
            const createUser = await this.userModel.create({
                name,
                password: utils_1.Hash.make(password),
                serviceNumber,
                unit: userUnit._id,
                categoryName: userUnit.category.name,
            });
            return createUser;
        }
        console.log("hey", data);
        const createUser = await this.userModel.create({
            name: name,
            password: utils_1.Hash.make(password),
            serviceNumber: serviceNumber,
            role: user_schema_1.UserRole.SuperAdmin,
        });
        return createUser;
    }
    async login(data) {
        const { serviceNumber, password } = data;
        const user = await this.userModel
            .findOne({ serviceNumber })
            .populate("unit");
        const confirmPassword = utils_1.Hash.compare(password, user.password);
        console.log(user);
        if (!user || !confirmPassword) {
            throw new common_1.UnauthorizedException("Invalid Credentials");
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
        if (user.role === "Super Admin") {
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
        if (user.role === "Super Admin") {
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
        if (user.role === "Brigade Commander" ||
            user.role === "Division Commander" ||
            user.role === "Super Admin") {
            console.log("hey");
            const user = await this.userModel.findById(userId).populate("unit");
            console.log(user);
            await this.userModel.findByIdAndUpdate(userId, {
                role: user_schema_1.UserRole.UnitCommander,
            });
            return {
                message: `${user.serviceNumber} successfully appointed as ${user.unit.name} Unit Commander `,
            };
        }
    }
    async appointAmourer(id, data) {
        const { userId } = data;
        const commProfile = await this.userModel.findById(id).populate("unit");
        const user = await this.userModel.findById(userId).populate("unit");
        if (commProfile.role === user_schema_1.UserRole.UnitCommander && commProfile.unit._id.toString() === user.unit._id.toString()) {
            await this.userModel.findByIdAndUpdate(userId, {
                role: user_schema_1.UserRole.Amourer,
            });
            return { message: "Successful" };
        }
    }
    async registerWeapon(id, weaponData) {
        const user = await this.userModel.findById(id).populate("unit");
        if (user.role === "Unit Commander") {
            const commanderData = {
                unitId: user.unit._id,
            };
            console.log(commanderData);
            return await this.weaponsService.createWeapon(commanderData, weaponData);
        }
    }
    async getWeapons(id, data) {
        const user = await this.userModel.findById(id).populate("unit");
        if (user.role === "Unit Member") {
            const userData = {
                unitId: user.unit._id,
            };
            return await this.weaponsService.getWeaponsByUnitMem(userData);
        }
        if (user.role === "Unit Commander" || user.role === "Brigade Commander" || user.role === "Division Commander") {
            const commanderData = {
                unitId: user.unit._id,
            };
            return await this.weaponsService.getWeaponsByComm(commanderData);
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
    async weaponsAwaitRelease(id) {
        const user = await this.userModel.findById(id).populate("unit");
        return await this.weaponsService.weaponsAwaitRelease(user.unit._id);
    }
    async releasedWeapons(id) {
        const user = await this.userModel.findById(id).populate("unit");
        return await this.weaponsService.releasedWeapons(user.unit._id);
    }
    async approveWeapon(id, data) {
        const user = await this.userModel.findById(id).populate("unit");
        if (user.role === user_schema_1.UserRole.UnitCommander) {
            return await this.weaponsService.approveWeapon(user.unit._id, data);
        }
    }
    async releaseWeapon(id, data) {
        const user = await this.userModel.findById(id).populate("unit");
        if (user.role === user_schema_1.UserRole.Amourer) {
            return await this.weaponsService.releaseWeapon(user.unit._id, data);
        }
    }
    async retrieveWeapon(id, data) {
        const user = await this.userModel.findById(id).populate("unit");
        if (user.role === user_schema_1.UserRole.Amourer) {
            return await this.weaponsService.retrieveWeapon(user.unit._id, data);
        }
    }
    async weaponHistory(id) {
        const user = await this.userModel.findById(id);
        return await this.weaponsService.weaponHistory(user._id);
    }
    async getAllUsers() {
        return await this.userModel.find();
    }
    async getAllUnitUsers(id) {
        const user = await this.userModel.findById(id).populate("unit");
        return await this.userModel.find({ unit: user.unit._id });
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