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
const swagger_1 = require("@nestjs/swagger");
const auth_service_1 = require("./auth.service");
const user_dto_1 = require("./dto/user.dto");
const jwt_auth_guard_1 = require("../../guards/jwt-auth.guard");
const criminal_service_1 = require("../criminal/criminal.service");
const platform_express_1 = require("@nestjs/platform-express");
const crimina_dto_1 = require("../criminal/dto/crimina.dto");
let AuthController = class AuthController {
    constructor(authService, criminalService) {
        this.authService = authService;
        this.criminalService = criminalService;
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
    getUserById(req) {
        const id = req.user.id;
        return this.authService.getUserById(id);
    }
    getAllUsers() {
        return this.authService.getAllUsers();
    }
    getAllUnitUsers(req) {
        const id = req.user.id;
        return this.authService.getAllUnitUsers(id);
    }
    criminalRecords() {
        return this.authService.criminalRecords();
    }
    createCriminal(data, req) {
        const id = req.user.id;
        return this.authService.createCriminal(data, id);
    }
    async uploadFiles(files) {
        try {
            const upload = await this.authService.uploadFiles(files);
            return upload;
        }
        catch (error) {
            if ((error === null || error === void 0 ? void 0 : error.status) >= 400 && (error === null || error === void 0 ? void 0 : error.status) < 500) {
                throw new common_1.NotAcceptableException(error === null || error === void 0 ? void 0 : error.message);
            }
            throw error;
        }
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)("/register"),
    (0, swagger_1.ApiOperation)({ summary: "Register a new user" }),
    (0, swagger_1.ApiResponse)({ status: 201, description: "User registered successfully." }),
    (0, swagger_1.ApiBody)({ type: user_dto_1.RegisterDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.RegisterDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "register", null);
__decorate([
    (0, common_1.Post)("/login"),
    (0, swagger_1.ApiOperation)({ summary: "User login" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "User logged in successfully." }),
    (0, swagger_1.ApiBody)({ type: user_dto_1.LoginDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.LoginDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Put)("/appoint/division-comm"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: "Appoint a division commander" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Division commander appointed." }),
    (0, swagger_1.ApiBody)({ type: user_dto_1.AppointDto }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, user_dto_1.AppointDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "appointDivisionComm", null);
__decorate([
    (0, common_1.Put)("/appoint/brigade-comm"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: "Appoint a brigade commander" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Brigade commander appointed." }),
    (0, swagger_1.ApiBody)({ type: user_dto_1.AppointDto }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, user_dto_1.AppointDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "appointBrigadeComm", null);
__decorate([
    (0, common_1.Put)("/appoint/battalion-comm"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: "Appoint a battalion commander" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Battalion commander appointed." }),
    (0, swagger_1.ApiBody)({ type: user_dto_1.AppointDto }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, user_dto_1.AppointDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "appointBattalionComm", null);
__decorate([
    (0, common_1.Get)("/get/user"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: "Get user by ID" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "User data retrieved." }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "getUserById", null);
__decorate([
    (0, common_1.Get)("/all/users"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: "Get all users" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "List of all users." }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "getAllUsers", null);
__decorate([
    (0, common_1.Get)("/all/unit-users"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: "Get all unit users" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "List of unit users." }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "getAllUnitUsers", null);
__decorate([
    (0, common_1.Get)("criminal-records"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: "Get all Criminal Records" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "List of unit users." }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "criminalRecords", null);
__decorate([
    (0, common_1.Post)("criminal-record"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: "Create Criminal Record" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "List of unit users." }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [crimina_dto_1.CreateCriminalDto, Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "createCriminal", null);
__decorate([
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([{ name: 'media', maxCount: 5 }])),
    (0, common_1.Post)('upload-files'),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                media: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'The image has been successfully uploaded.',
    }),
    (0, swagger_1.ApiResponse)({ status: 406, description: 'Not Acceptable: Error message.' }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "uploadFiles", null);
exports.AuthController = AuthController = __decorate([
    (0, swagger_1.ApiTags)("User Authentication"),
    (0, common_1.Controller)("user"),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        criminal_service_1.CriminalService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map