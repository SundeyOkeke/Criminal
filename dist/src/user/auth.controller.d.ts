import { AuthService } from "./auth.service";
import { AppointDto, LoginDto, RegisterDto } from "./dto/user.dto";
import { CriminalService } from "src/criminal/criminal.service";
import { CreateCriminalDto } from "src/criminal/dto/crimina.dto";
export declare class AuthController {
    private authService;
    private criminalService;
    constructor(authService: AuthService, criminalService: CriminalService);
    register(data: RegisterDto): Promise<{
        _id: any;
        name: string;
        serviceNumber: string;
        role: import("./schema/user.schema").UserRole;
        unit: string;
        categoryName: string;
    }>;
    login(data: LoginDto): Promise<{
        token: string;
        response: {
            _id: any;
            name: string;
            serviceNumber: string;
            role: import("./schema/user.schema").UserRole;
            unit: string;
            categoryName: string;
        };
    }>;
    appointDivisionComm(req: any, data: AppointDto): Promise<{
        message: string;
    }>;
    appointBrigadeComm(req: any, data: AppointDto): Promise<{
        message: string;
    }>;
    appointBattalionComm(req: any, data: AppointDto): Promise<{
        message: string;
    }>;
    getUserById(req: any): Promise<import("mongoose").Document<unknown, {}, import("./schema/user.schema").User, {}> & import("./schema/user.schema").User & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    getAllUsers(): Promise<(import("mongoose").Document<unknown, {}, import("./schema/user.schema").User, {}> & import("./schema/user.schema").User & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    getAllUnitUsers(req: any): Promise<(import("mongoose").Document<unknown, {}, import("./schema/user.schema").User, {}> & import("./schema/user.schema").User & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    criminalRecords(): Promise<{
        unit: string;
        lockedBy: string;
        _id: import("mongoose").Types.ObjectId;
        $locals: Record<string, unknown>;
        $op: "save" | "validate" | "remove" | null;
        $where: Record<string, unknown>;
        baseModelName?: string;
        collection: import("mongoose").Collection;
        db: import("mongoose").Connection;
        errors?: import("mongoose").Error.ValidationError;
        id?: any;
        isNew: boolean;
        schema: import("mongoose").Schema;
        name: string;
        dob: string;
        lockUpDate: string;
        releaseDate: string;
        bvn: string;
        nin: string;
        address: string;
        phoneNumber: string;
        imageUrl: string;
        __v: number;
    }[]>;
    createCriminal(data: CreateCriminalDto, req: any): Promise<import("mongoose").Document<unknown, {}, import("../criminal/schema/criminal.schema").Criminal, {}> & import("../criminal/schema/criminal.schema").Criminal & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    uploadFiles(files: any): Promise<{
        mediaURLs: any[];
    }>;
}
