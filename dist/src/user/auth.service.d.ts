import { Model } from "mongoose";
import { User, UserRole } from "./schema/user.schema";
import { JwtService } from "@nestjs/jwt";
import { CategoryService } from "src/categories/category.service";
import { AppointDto, CreateReportDto, LoginDto, RegisterDto } from "./dto/user.dto";
import { CriminalService } from "src/criminal/criminal.service";
import { CreateCriminalDto } from "src/criminal/dto/crimina.dto";
import { Socket } from 'socket.io';
export declare class AuthService {
    private userModel;
    private jwtService;
    private categoryService;
    private criminalService;
    constructor(userModel: Model<User>, jwtService: JwtService, categoryService: CategoryService, criminalService: CriminalService);
    register(data: RegisterDto): Promise<{
        _id: any;
        name: string;
        serviceNumber: string;
        role: UserRole;
        unit: string;
        categoryName: string;
    }>;
    login(data: LoginDto): Promise<{
        token: string;
        response: {
            _id: any;
            name: string;
            serviceNumber: string;
            role: UserRole;
            unit: string;
            categoryName: string;
        };
    }>;
    appointDivisionComm(id: any, data: AppointDto): Promise<{
        message: string;
    }>;
    appointBrigadeComm(id: any, data: AppointDto): Promise<{
        message: string;
    }>;
    appointBattalionComm(id: any, data: AppointDto): Promise<{
        message: string;
    }>;
    decodeToken(token: string): Promise<any>;
    getUserById(id: any): Promise<import("mongoose").Document<unknown, {}, User, {}> & User & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    getAllUsers(): Promise<(import("mongoose").Document<unknown, {}, User, {}> & User & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    getAllUnitUsers(id: string): Promise<(import("mongoose").Document<unknown, {}, User, {}> & User & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    uploadFiles(files: any): Promise<{
        mediaURLs: any[];
    }>;
    createCriminal(data: CreateCriminalDto, id: string): Promise<import("mongoose").Document<unknown, {}, import("../criminal/schema/criminal.schema").Criminal, {}> & import("../criminal/schema/criminal.schema").Criminal & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    criminalRecords(): Promise<{
        _id: import("mongoose").Types.ObjectId;
        name: string;
        dob: string;
        lockUpDate: string;
        releaseDate: string;
        bvn: string;
        nin: string;
        address: string;
        phoneNumber: string;
        imageUrl: string;
        unit: string;
        lockedBy: string;
        createdAt: Date;
    }[]>;
    getUserFromSocket(socket: Socket): Promise<any>;
    criminalReport(data: CreateReportDto, id: string): Promise<User[]>;
    getcriminalReport(id: string): Promise<{
        _id: import("mongoose").Types.ObjectId;
        report: string;
        unit: string;
        reportedBy: string;
        date: Date;
    }[]>;
}
