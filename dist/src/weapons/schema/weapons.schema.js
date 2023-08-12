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
exports.WeaponSchema = exports.Weapon = exports.ArmType = exports.Condition = exports.Approval = exports.Availability = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const unit_schema_1 = require("../../categories/schema/unit.schema");
var Availability;
(function (Availability) {
    Availability["Available"] = "available";
    Availability["SignedOut"] = "signed out";
    Availability["Missing"] = "missing";
})(Availability = exports.Availability || (exports.Availability = {}));
var Approval;
(function (Approval) {
    Approval["AwaitingApproval"] = "Awaiting Approval";
    Approval["SigninApproved"] = "Signed-in Approved";
    Approval["AwaitingRelease"] = "Awaiting Release";
    Approval["Released"] = "Issued";
})(Approval = exports.Approval || (exports.Approval = {}));
var Condition;
(function (Condition) {
    Condition["Good"] = "Good";
    Condition["Bad"] = "Bad";
})(Condition = exports.Condition || (exports.Condition = {}));
var ArmType;
(function (ArmType) {
    ArmType["AK47"] = "AK47";
    ArmType["Pistol"] = "Pistol";
    ArmType["FNRifles"] = "FN Rifles";
    ArmType["AK47Bullet"] = "AK47 Bullet";
    ArmType["PistolBullet"] = "Pistol Bullet";
    ArmType["FNRiflesBullet"] = "FNRifles Bullet";
})(ArmType = exports.ArmType || (exports.ArmType = {}));
let Weapon = class Weapon {
};
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Weapon.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Weapon.prototype, "DateOfManufacture", void 0);
__decorate([
    (0, mongoose_1.Prop)({ unique: [true, "Weapon Serial Number exists"] }),
    __metadata("design:type", String)
], Weapon.prototype, "serialNumber", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Weapon.prototype, "productionDate", void 0);
__decorate([
    (0, mongoose_1.Prop)({ enum: Availability, default: Availability.Available }),
    __metadata("design:type", String)
], Weapon.prototype, "availability", void 0);
__decorate([
    (0, mongoose_1.Prop)({ enum: Condition }),
    __metadata("design:type", String)
], Weapon.prototype, "condition", void 0);
__decorate([
    (0, mongoose_1.Prop)({ enum: ArmType }),
    __metadata("design:type", String)
], Weapon.prototype, "armType", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.SchemaTypes.ObjectId, ref: "Unit" }),
    __metadata("design:type", unit_schema_1.Unit)
], Weapon.prototype, "unit", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: [
            {
                user: { type: mongoose_2.SchemaTypes.ObjectId, ref: "User" },
                signoutDate: Date,
                proposedSigninDate: Date,
                actualSigninDate: Date,
                approve: String,
                approvedBy: { type: mongoose_2.SchemaTypes.ObjectId, ref: "User" },
                releasedBy: { type: mongoose_2.SchemaTypes.ObjectId, ref: "User" },
                retrievedBy: { type: mongoose_2.SchemaTypes.ObjectId, ref: "User" },
                note: String,
            },
        ],
        default: [],
    }),
    __metadata("design:type", Array)
], Weapon.prototype, "users", void 0);
Weapon = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Weapon);
exports.Weapon = Weapon;
exports.WeaponSchema = mongoose_1.SchemaFactory.createForClass(Weapon);
//# sourceMappingURL=weapons.schema.js.map