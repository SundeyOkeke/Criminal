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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const user_dto_1 = require("./dto/user.dto");
const jwt_auth_guard_1 = require("../../guards/jwt-auth.guard");
const weapons_dto_1 = require("../weapons/dto/weapons.dto");
const weapons_service_1 = require("../weapons/weapons.service");
let AuthController = class AuthController {
    constructor(authService, weaponsService) {
        this.authService = authService;
        this.weaponsService = weaponsService;
    }
    register(data) {
        return this.authService.register(data);
    }
    login(data) {
        return this.authService.login(data);
    }
    appointDivisionComm(req, data) {
        const id = req.user.id;
        return this.authService.appointDivisionComm(id, data);
    }
    appointBrigadeComm(req, data) {
        const id = req.user.id;
        return this.authService.appointBrigadeComm(id, data);
    }
    appointBattalionComm(req, data) {
        const id = req.user.id;
        return this.authService.appointBattalionComm(id, data);
    }
    appointAmourer(req, data) {
        const id = req.user.id;
        return this.authService.appointAmourer(id, data);
    }
    registerWeapon(req, data) {
        const id = req.user.id;
        return this.authService.registerWeapon(id, data);
    }
    getWeapons(req, data) {
        const id = req.user.id;
        return this.authService.getWeapons(id, data);
    }
    allWeapons() {
        return this.weaponsService.allWeapons();
    }
    signoutWeapon(req, data) {
        const id = req.user.id;
        return this.authService.signoutWeapon(id, data);
    }
    getUserById(req) {
        const id = req.user.id;
        return this.authService.getUserById(id);
    }
    getWeaponById(weaponId) {
        return this.weaponsService.getWeaponById(weaponId);
    }
    getWeaponByArmType(req, armType) {
        const id = req.user.id;
        console.log(armType);
        return this.authService.getWeaponByArmType(id, armType);
    }
    weaponsAwaitApproval(req) {
        const id = req.user.id;
        return this.authService.weaponsAwaitApproval(id);
    }
    weaponsAwaitRelease(req) {
        const id = req.user.id;
        return this.authService.weaponsAwaitRelease(id);
    }
    releasedWeapons(req) {
        const id = req.user.id;
        return this.authService.releasedWeapons(id);
    }
    approveWeapon(req, data) {
        const id = req.user.id;
        return this.authService.approveWeapon(id, data);
    }
    releaseWeapon(req, data) {
        const id = req.user.id;
        return this.authService.releaseWeapon(id, data);
    }
    retrieveWeapon(req, data) {
        const id = req.user.id;
        return this.authService.retrieveWeapon(id, data);
    }
    weaponHistory(req) {
        const id = req.user.id;
        return this.authService.weaponHistory(id);
    }
    getAllUsers() {
        return this.authService.getAllUsers();
    }
    getAllUnitUsers(req) {
        const id = req.user.id;
        return this.authService.getAllUnitUsers(id);
    }
    getUserByProvidedId(userId) {
        return this.authService.getUserById(userId);
    }
    getUnitWeapons(unitId) {
        return this.weaponsService.getUnitWeapons(unitId);
    }
};
__decorate([
    (0, common_1.Post)("/register"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.RegisterDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "register", null);
__decorate([
    (0, common_1.Post)("/login"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.LoginDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Put)("/appoint/division/comm"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, user_dto_1.AppointDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "appointDivisionComm", null);
__decorate([
    (0, common_1.Put)("/appoint/brigade/comm"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, user_dto_1.AppointDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "appointBrigadeComm", null);
__decorate([
    (0, common_1.Put)("/appoint/battalion/comm"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, user_dto_1.AppointDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "appointBattalionComm", null);
__decorate([
    (0, common_1.Put)("/appoint/amourer"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, user_dto_1.AppointDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "appointAmourer", null);
__decorate([
    (0, common_1.Post)("/register/weapon"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, weapons_dto_1.WeaponDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "registerWeapon", null);
__decorate([
    (0, common_1.Get)("/get/weapon"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, weapons_dto_1.CategoryWeaponDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "getWeapons", null);
__decorate([
    (0, common_1.Get)("/all/weapons"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "allWeapons", null);
__decorate([
    (0, common_1.Post)("/signout/weapon"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, weapons_dto_1.signoutWeaponDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "signoutWeapon", null);
__decorate([
    (0, common_1.Get)("/get/user"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "getUserById", null);
__decorate([
    (0, common_1.Get)("/get/:weaponId"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)("weaponId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "getWeaponById", null);
__decorate([
    (0, common_1.Get)("/get/weapon-armType/:armType"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)("armType")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "getWeaponByArmType", null);
__decorate([
    (0, common_1.Get)("/weapons/await-approval"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "weaponsAwaitApproval", null);
__decorate([
    (0, common_1.Get)("/weapons/await-release"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "weaponsAwaitRelease", null);
__decorate([
    (0, common_1.Get)("/released/weapons"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "releasedWeapons", null);
__decorate([
    (0, common_1.Patch)("/approve/weapon"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, weapons_dto_1.approveWeaponDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "approveWeapon", null);
__decorate([
    (0, common_1.Patch)("/release/weapon"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, weapons_dto_1.releaseWeaponDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "releaseWeapon", null);
__decorate([
    (0, common_1.Patch)("/retrieve/weapon"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, weapons_dto_1.retrieveWeaponDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "retrieveWeapon", null);
__decorate([
    (0, common_1.Get)("/weapon/history"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "weaponHistory", null);
__decorate([
    (0, common_1.Get)("/all/users"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "getAllUsers", null);
__decorate([
    (0, common_1.Get)("/all/unit-users"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "getAllUnitUsers", null);
__decorate([
    (0, common_1.Get)("/get/user-id/:userId"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)("userId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "getUserByProvidedId", null);
__decorate([
    (0, common_1.Get)("/get/unit/weapons/:unitId"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)("unitId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "getUnitWeapons", null);
AuthController = __decorate([
    (0, common_1.Controller)("user"),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        weapons_service_1.WeaponsService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map