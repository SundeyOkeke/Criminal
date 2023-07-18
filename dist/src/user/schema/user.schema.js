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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = exports.User = exports.Hash = exports.UserRole = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const unit_schema_1 = require("../../categories/schema/unit.schema");
const bcrypt = require("bcrypt");
var UserRole;
(function (UserRole) {
    UserRole["UnitMember"] = "Unit Member";
    UserRole["UnitCommander"] = "Unit Commander";
    UserRole["BrigadeCommander"] = "Brigade Commander";
    UserRole["DivisionCommander"] = "Division Commander";
    UserRole["SuperAdmin"] = "Super Admin";
})(UserRole = exports.UserRole || (exports.UserRole = {}));
class Hash {
    static make(plainText) {
        const salt = bcrypt.genSaltSync();
        return bcrypt.hashSync(plainText, salt);
    }
    static compare(plainText, hash) {
        return bcrypt.compareSync(plainText, hash);
    }
}
exports.Hash = Hash;
let User = class User {
};
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, mongoose_1.Prop)({ unique: [true, "Service Number exists"] }),
    __metadata("design:type", String)
], User.prototype, "serviceNumber", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.SchemaTypes.ObjectId, ref: "Unit" }),
    __metadata("design:type", unit_schema_1.Unit)
], User.prototype, "unit", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false }),
    __metadata("design:type", String)
], User.prototype, "categoryName", void 0);
__decorate([
    (0, mongoose_1.Prop)({ enum: UserRole, default: UserRole.UnitMember }),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
User = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], User);
exports.User = User;
exports.UserSchema = mongoose_1.SchemaFactory.createForClass(User);
//# sourceMappingURL=user.schema.js.map