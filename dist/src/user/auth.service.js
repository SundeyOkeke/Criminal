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
const criminal_service_1 = require("../criminal/criminal.service");
const utils_1 = require("../utils/utils");
const multer_1 = require("../utils/multer");
const websockets_1 = require("@nestjs/websockets");
let AuthService = class AuthService {
    constructor(userModel, jwtService, categoryService, criminalService) {
        this.userModel = userModel;
        this.jwtService = jwtService;
        this.categoryService = categoryService;
        this.criminalService = criminalService;
    }
    async register(data) {
        const { name, serviceNumber, unitId, password } = data;
        if (unitId) {
            const user = await this.userModel.findOne({ serviceNumber });
            if (user) {
                throw new common_1.UnauthorizedException("Service Number already exists");
            }
            const userUnit = await this.categoryService.findOneUnit(unitId);
            const createUser = await this.userModel.create({
                name,
                password: utils_1.Hash.make(password),
                serviceNumber,
                unit: userUnit._id,
                categoryName: userUnit.category.name,
            });
            return {
                _id: createUser._id,
                name: createUser.name,
                serviceNumber: createUser.serviceNumber,
                role: createUser.role,
                unit: userUnit.name,
                categoryName: userUnit.category.name
            };
        }
        const createUser = await this.userModel.create({
            name: name,
            password: utils_1.Hash.make(password),
            serviceNumber: serviceNumber,
            role: user_schema_1.UserRole.SuperAdmin,
        });
        return {
            _id: createUser._id,
            name: createUser.name,
            serviceNumber: createUser.serviceNumber,
            role: createUser.role,
            unit: "Super Admin",
            categoryName: "Super Admin"
        };
    }
    async login(data) {
        var _a, _b;
        const { serviceNumber, password } = data;
        const user = await this.userModel
            .findOne({ serviceNumber })
            .populate("unit")
            .populate("unit.category");
        console.log(user);
        if (!user) {
            throw new common_1.UnauthorizedException("Invalid Credentials");
        }
        const confirmPassword = utils_1.Hash.compare(password, user.password);
        if (!confirmPassword) {
            throw new common_1.UnauthorizedException("Invalid Credentials");
        }
        const payload = {
            id: user._id,
            category: user.categoryName,
            role: user.role,
        };
        const token = this.jwtService.sign(payload);
        const response = {
            _id: user._id,
            name: user.name,
            serviceNumber: user.serviceNumber,
            role: user.role,
            unit: (_b = (_a = user.unit) === null || _a === void 0 ? void 0 : _a.name) !== null && _b !== void 0 ? _b : "Super Admin",
            categoryName: user.categoryName
        };
        return { token, response };
    }
    async appointDivisionComm(id, data) {
        const { userId } = data;
        const user = await this.userModel.findById(id);
        if (user.role === "Super Admin") {
            const user = await this.userModel.findById(userId);
            await this.userModel.findByIdAndUpdate(userId, {
                role: user_schema_1.UserRole.DivisionCommander,
                categoryName: "Division"
            });
            return { message: "Successful" };
        }
    }
    async appointBrigadeComm(id, data) {
        const { userId } = data;
        const user = await this.userModel.findById(id);
        if (user.role === "Super Admin" || user.role === "Division Commander") {
            const user = await this.userModel.findById(userId);
            await this.userModel.findByIdAndUpdate(userId, {
                role: user_schema_1.UserRole.BrigadeCommander,
                categoryName: "Brigade"
            });
            return { message: "Successful" };
        }
    }
    async appointBattalionComm(id, data) {
        const { userId } = data;
        const user = await this.userModel.findById(id);
        if (user.role === "Brigade Commander" ||
            user.role === "Division Commander" ||
            user.role === "Super Admin") {
            const user = await this.userModel.findById(userId).populate("unit");
            await this.userModel.findByIdAndUpdate(userId, {
                role: user_schema_1.UserRole.UnitCommander,
                categoryName: "Battalion"
            });
            return { message: "Successful" };
        }
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
    async getAllUsers() {
        return await this.userModel.find();
    }
    async getAllUnitUsers(id) {
        const user = await this.userModel.findById(id).populate("unit");
        const [unitMember, commanders] = await Promise.all([
            this.userModel.find({ unit: user.unit._id }),
            this.userModel.find({ role: { $in: [user_schema_1.UserRole.UnitCommander, user_schema_1.UserRole.DivisionCommander, user_schema_1.UserRole.BrigadeCommander] },
            })
        ]);
        const response = user.role === user_schema_1.UserRole.UnitCommander || user.role === user_schema_1.UserRole.BrigadeCommander || user.role === user_schema_1.UserRole.DivisionCommander ? [...unitMember, ...commanders] : unitMember;
        return response.filter((data) => data._id.toString() !== id.toString());
    }
    async uploadFiles(files) {
        try {
            const mediaURLs = [];
            if (!files) {
                throw new common_1.NotAcceptableException('Upload an image');
            }
            const imageFiles = files.media;
            if (!Array.isArray(imageFiles)) {
                throw new common_1.NotAcceptableException('Expected an array of images');
            }
            const folderName = 'Criminal';
            await Promise.all(imageFiles.map(async (data) => {
                const upload = await (0, multer_1.uploadToCloudinary)(data, folderName);
                mediaURLs.push(upload.secure_url);
            }));
            return { mediaURLs: mediaURLs };
        }
        catch (error) {
            throw error;
        }
    }
    async createCriminal(data, id) {
        const user = await this.userModel.findById(id).populate("unit");
        return await this.criminalService.createCriminal(data, user);
    }
    async criminalRecords() {
        return await this.criminalService.criminalRecords();
    }
    async getUserFromSocket(socket) {
        var _a;
        let authHeader = socket.handshake.auth;
        let auth_token = (_a = authHeader.authorization) !== null && _a !== void 0 ? _a : socket.handshake.headers.authorization;
        if (!auth_token) {
            throw new websockets_1.WsException('Unauthorised or Expired session');
        }
        auth_token = auth_token.split(' ')[1];
        const user = await this.decodeToken(auth_token);
        if (!user) {
            throw new websockets_1.WsException('Invalid credentials.');
        }
        return user;
    }
    async criminalReport(data, id) {
        const user = await this.getUserById(id);
        const reportTo = await Promise.all(data.reportToIds.map(async (reportToId) => {
            const user = await this.getUserById(reportToId);
            return user;
        }));
        return await this.criminalService.criminalReport(data.report, user, reportTo);
    }
    async getcriminalReport(id) {
        return await this.criminalService.getcriminalReport(id);
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)("User")),
    __metadata("design:paramtypes", [mongoose_2.Model,
        jwt_1.JwtService,
        category_service_1.CategoryService,
        criminal_service_1.CriminalService])
], AuthService);
//# sourceMappingURL=auth.service.js.map