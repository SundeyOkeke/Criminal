import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User, UserRole } from "./schema/user.schema";
import * as bcrypt from "bcryptjs";
import { JwtService } from "@nestjs/jwt";

import { Unit } from "src/categories/schema/unit.schema";
import { CategoryService } from "src/categories/category.service";
import { AppointCommDto, LoginDto, RegisterDto } from "./dto/user.dto";
import { WeaponDto } from "src/weapons/dto/weapons.dto";
import { Weapon } from "src/weapons/schema/weapons.schema";
import { WeaponsService } from "src/weapons/weapons.service";

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private jwtService: JwtService,
    private categoryService: CategoryService,
    private weaponsService: WeaponsService
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
      console.log(userUnit);

      const createUser = await this.userModel.create({
        name,
        serviceNumber,
        unit: userUnit._id,
        categoryName: (userUnit.category as { name: string }).name,
      });

      return createUser;
    }
    console.log("hey", data);

    const createUser = await this.userModel.create({
      name: name,
      serviceNumber: serviceNumber,
      role: UserRole.SuperAdmin,
    });

    return createUser;
  }

  async login(data: LoginDto) {
    const { serviceNumber } = data;

    const user = await this.userModel
      .findOne({ serviceNumber })
      .populate("unit");
    console.log(user);
    if (!user) {
      throw new UnauthorizedException("User not found");
    }

    const payload = {
      id: user._id,
      category: user.categoryName,
      role: user.role,
    };
    const token = this.jwtService.sign(payload);

    return { token, user };
  }

  async appointDivisionComm(id, data: AppointCommDto) {
    const { userId } = data;
    const user = await this.userModel.findById(id);
    if (user.role === "super admin") {
      console.log("hey");
      const user = await this.userModel.findById(userId);
      if (user.categoryName === "Division") {
        await this.userModel.findByIdAndUpdate(userId, {
          role: UserRole.DivisionCommander,
        });
        return { message: "Successful" };
      }
    }
  }

  async appointBrigadeComm(id, data: AppointCommDto) {
    const { userId } = data;
    const user = await this.userModel.findById(id);
    if (user.role === "super admin") {
      console.log("hey");
      const user = await this.userModel.findById(userId);
      console.log(user);
      if (user.categoryName === "Brigade") {
        await this.userModel.findByIdAndUpdate(userId, {
          role: UserRole.BrigadeCommander,
        });
        return { message: "Successful" };
      }
    }
  }

  async appointBattalionComm(id, data: AppointCommDto) {
    const { userId } = data;
    const user = await this.userModel.findById(id);
    if (
      user.role === "brigade commander" ||
      user.role === "division commander" ||
      user.role === "super admin"
    ) {
      console.log("hey");
      const user = await this.userModel.findById(userId).populate("unit");
      console.log(user);
      if (
        user.categoryName === "Battalion" ||
        user.categoryName === "Brigade" ||
        user.categoryName === "Division"
      ) {
        await this.userModel.findByIdAndUpdate(userId, {
          role: UserRole.UnitCommander,
        });
        return {
          message: `${user.serviceNumber} successfully appointed as ${user.unit.name} unit commander `,
        };
      }
    }
  }

  async registerWeapon(id, weaponData: WeaponDto) {
    const user = await this.userModel.findById(id).populate("unit");
    if (user.role === "unit commander") {
      const commanderData = {
        unitId: user.unit._id,
      };
      console.log(commanderData);

      return await this.weaponsService.createWeapon(commanderData, weaponData);
    }
  }

  async getWeapons(id, data) {
    const user = await this.userModel.findById(id).populate("unit");
    if (user.role === "unit member") {
      const userData = {
        unitId: user.unit._id,
      };
      return await this.weaponsService.getWeaponsByUnitMem(userData);
    }
    if (user.role === "unit commander") {
      const commanderData = {
        unitId: user.unit._id,
      };
      return await this.weaponsService.getWeaponsByUnitComm(commanderData);
    }
    if (user.role === "brigade commander") {
      return await this.weaponsService.getWeaponsByBrigadeComm(data);
    }
    if (user.role === "division commander") {
      return await this.weaponsService.getWeaponsByDivisionComm(data);
    }
  }

  async signoutWeapon(id, data) {
    const {weaponId,returnDate } = data
    const user = await this.userModel.findById(id).populate("unit");
    const weapon = await this.weaponsService.getWeaponById(weaponId)
    console.log(user.unit._id)
    console.log(weapon.unit._id)
    if(user.unit._id.toString() === weapon.unit._id.toString()){
      console.log("hey")
      return await this.weaponsService.signoutWeapon(user,data )
    }
    
    throw new UnauthorizedException("Unauthorised")
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
  async getUserById(id) {
    return await this.userModel.findById(id).populate("unit")
   
  }

  async weaponsAwaitApproval(id) {
    const user =  await this.userModel.findById(id).populate("unit")
   return await this.weaponsService.weaponsAwaitApproval(user.unit._id)
  }

  async approveWeapon(id, data) {
    const user =  await this.userModel.findById(id).populate("unit")
    if(user.role === "unit commander"){
      return await this.weaponsService.approveWeapon(user.unit._id, data)

    }
  }
  async weaponHistory(id) {
    const user =  await this.userModel.findById(id)
    return await this.weaponsService.weaponHistory(user._id)
  }

  async getAllUsers() {
    return await this.userModel.find()
  }
}





