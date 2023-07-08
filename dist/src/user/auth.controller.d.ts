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
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import { AuthService } from "./auth.service";
import { AppointCommDto, LoginDto, RegisterDto } from "./dto/user.dto";
import { CategoryWeaponDto, WeaponDto } from "src/weapons/dto/weapons.dto";
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(data: RegisterDto): Promise<import("mongoose").Document<unknown, {}, import("./schema/user.schema").User> & Omit<import("./schema/user.schema").User & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
    login(data: LoginDto): Promise<{
        token: string;
        user: import("mongoose").Document<unknown, {}, import("./schema/user.schema").User> & Omit<import("./schema/user.schema").User & {
            _id: import("mongoose").Types.ObjectId;
        }, never>;
    }>;
    appointDivisionComm(req: any, data: AppointCommDto): Promise<{
        message: string;
    }>;
    appointBrigadeComm(req: any, data: AppointCommDto): Promise<{
        message: string;
    }>;
    appointBattalionComm(req: any, data: AppointCommDto): Promise<{
        message: string;
    }>;
    registerWeapon(req: any, data: WeaponDto): Promise<import("mongoose").Document<unknown, {}, import("../weapons/schema/weapons.schema").Weapon> & Omit<import("../weapons/schema/weapons.schema").Weapon & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
    getWeapons(req: any, data: CategoryWeaponDto): Promise<any[]>;
}
