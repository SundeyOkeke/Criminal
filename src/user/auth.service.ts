import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User, UserRole } from "./schema/user.schema";
import * as bcrypt from "bcryptjs";
import { JwtService } from "@nestjs/jwt";

import { mailsent, resetPasswordmailHtml } from "src/utils";
import { Unit } from "src/categories/schema/unit.schema";
import { CategoryService } from "src/categories/category.service";
import { AppointCommDto, LoginDto, RegisterDto } from "./dto/user.dto";

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private jwtService: JwtService,
    private categoryService: CategoryService
  ) {}

  async register(data: RegisterDto) {
    const { name, serviceNumber, unit } = data;

    if (unit) {
      //check if email already exists
      const user = await this.userModel.findOne({ serviceNumber });
      if (user) {
        throw new UnauthorizedException("Service Number already exists");
      }

      const userUnit = await this.categoryService.findOneUnit(unit);

      const createUser = await this.userModel.create({
        name,
        serviceNumber,
        unit: userUnit._id,
        categoryName: userUnit.category.name,
      });

      return createUser;
    }
    console.log("hey",data)
    
    const createUser = await this.userModel.create({
      name:name,
      serviceNumber:serviceNumber,
      role: UserRole.SuperAdmin,
    });

    return createUser;
  }

  async login(data: LoginDto) {
    const { serviceNumber } = data;

    const user = await this.userModel.findOne({ serviceNumber }).populate("unit");
    console.log(user);
    if (!user) {
      throw new UnauthorizedException("User not found");
    }

    const payload = {
      id: user._id,
      category: user.categoryName,
      role : user.role
    };
    const token = this.jwtService.sign(payload);

    return { token, user };
  }

  async appointDivisionComm(id, data: AppointCommDto) {
    const {userId } = data
    const user = await this.userModel.findById(id)
    if(user.role === "super admin") {
      console.log("hey")
      const user = await this.userModel.findById(userId)
      if(user.categoryName === "Division"){
        await this.userModel.findByIdAndUpdate(userId, {role : UserRole.DivisionCommander})
        return {message : "Successful"}
      }
      
    }
  }

  async appointBrigadeComm(id, data: AppointCommDto) {
    const {userId } = data
    const user = await this.userModel.findById(id)
    if(user.role === "super admin") {
      console.log("hey")
      const user = await this.userModel.findById(userId)
      console.log(user)
      if(user.categoryName === "Brigade"){
        await this.userModel.findByIdAndUpdate(userId, {role : UserRole.BrigadeCommander})
        return {message : "Successful"}
      }
      
    }
  }

  async appointBattalionComm(id, data: AppointCommDto) {
    const {userId } = data
    const user = await this.userModel.findById(id)
    if(user.role === "brigade commander" || user.role === "division commander") {
      console.log("hey")
      const user = await this.userModel.findById(userId).populate("unit")
      console.log(user)
      if(user.categoryName === "Battalion"){
        await this.userModel.findByIdAndUpdate(userId, {role : UserRole.UnitCommander})
        return {message : `${user.serviceNumber} successfully appointed as ${user.unit.name} unit commander `}
      }
      
    }
  }

  
  async decodeToken(token: string) {
    try {
      const decoded = this.jwtService.verify(token);
      return decoded;
    } catch (err) {
      console.error(err);
      return null;
    }
  }
}
