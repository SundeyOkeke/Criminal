/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { Model } from "mongoose";
import { User } from "./schema/user.schema";
import { JwtService } from "@nestjs/jwt";
import { CategoryService } from "src/categories/category.service";
import { AppointCommDto, LoginDto, RegisterDto } from "./dto/user.dto";
import { WeaponDto } from "src/weapons/dto/weapons.dto";
import { Weapon } from "src/weapons/schema/weapons.schema";
import { WeaponsService } from "src/weapons/weapons.service";
export declare class AuthService {
    private userModel;
    private jwtService;
    private categoryService;
    private weaponsService;
    constructor(userModel: Model<User>, jwtService: JwtService, categoryService: CategoryService, weaponsService: WeaponsService);
    register(data: RegisterDto): Promise<import("mongoose").Document<unknown, {}, User> & Omit<User & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
    login(data: LoginDto): Promise<{
        token: string;
        user: import("mongoose").Document<unknown, {}, User> & Omit<User & {
            _id: import("mongoose").Types.ObjectId;
        }, never>;
    }>;
    appointDivisionComm(id: any, data: AppointCommDto): Promise<{
        message: string;
    }>;
    appointBrigadeComm(id: any, data: AppointCommDto): Promise<{
        message: string;
    }>;
    appointBattalionComm(id: any, data: AppointCommDto): Promise<{
        message: string;
    }>;
    registerWeapon(id: any, weaponData: WeaponDto): Promise<import("mongoose").Document<unknown, {}, Weapon> & Omit<Weapon & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
    getWeapons(id: any, data: any): Promise<any[]>;
    signoutWeapon(id: any, data: any): Promise<import("mongoose").Document<unknown, {}, Weapon> & Omit<Weapon & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
    decodeToken(token: string): Promise<any>;
    getUserById(id: any): Promise<import("mongoose").Document<unknown, {}, User> & Omit<User & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
    weaponsAwaitApproval(id: any): Promise<(import("mongoose").Document<unknown, {}, Weapon> & Omit<Weapon & {
        _id: import("mongoose").Types.ObjectId;
    }, never>)[]>;
    approveWeapon(id: any, data: any): Promise<{
        message: string;
    }>;
    weaponHistory(id: any): Promise<(import("mongoose").Document<unknown, {}, Weapon> & Omit<Weapon & {
        _id: import("mongoose").Types.ObjectId;
    }, never>)[]>;
}
