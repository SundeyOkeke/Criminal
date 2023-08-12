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
exports.weaponDto = exports.retrieveWeaponDto = exports.releaseWeaponDto = exports.approveWeaponDto = exports.signoutWeaponDto = exports.CategoryWeaponDto = exports.WeaponDto = void 0;
const class_validator_1 = require("class-validator");
class WeaponDto {
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], WeaponDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], WeaponDto.prototype, "DateOfManufacture", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], WeaponDto.prototype, "productionDate", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], WeaponDto.prototype, "serialNumber", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], WeaponDto.prototype, "condition", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], WeaponDto.prototype, "armType", void 0);
exports.WeaponDto = WeaponDto;
class CategoryWeaponDto {
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CategoryWeaponDto.prototype, "categoryName", void 0);
exports.CategoryWeaponDto = CategoryWeaponDto;
class signoutWeaponDto {
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], signoutWeaponDto.prototype, "weaponId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], signoutWeaponDto.prototype, "returnDate", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Number)
], signoutWeaponDto.prototype, "numRounds", void 0);
exports.signoutWeaponDto = signoutWeaponDto;
class approveWeaponDto {
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], approveWeaponDto.prototype, "weaponId", void 0);
exports.approveWeaponDto = approveWeaponDto;
class releaseWeaponDto {
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], releaseWeaponDto.prototype, "weaponId", void 0);
exports.releaseWeaponDto = releaseWeaponDto;
class retrieveWeaponDto {
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], retrieveWeaponDto.prototype, "weaponId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], retrieveWeaponDto.prototype, "condition", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], retrieveWeaponDto.prototype, "note", void 0);
exports.retrieveWeaponDto = retrieveWeaponDto;
class weaponDto {
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], weaponDto.prototype, "weaponId", void 0);
exports.weaponDto = weaponDto;
//# sourceMappingURL=weapons.dto.js.map