import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User, UserRole } from "./schema/user.schema";
import * as bcrypt from "bcryptjs";
import { JwtService } from "@nestjs/jwt";

import { Unit } from "src/categories/schema/unit.schema";
import { CategoryService } from "src/categories/category.service";
import { AppointDto, LoginDto, RegisterDto } from "./dto/user.dto";
import { WeaponDto } from "src/weapons/dto/weapons.dto";
import { Weapon } from "src/weapons/schema/weapons.schema";
import { WeaponsService } from "src/weapons/weapons.service";
import { Hash } from "src/utils/utils";
import { Equal } from "typeorm";

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
    const { name, serviceNumber, unit, password } = data;

    if (unit) {
      //check if email already exists
      const user = await this.userModel.findOne({ serviceNumber });
      if (user) {
        throw new UnauthorizedException("Service Number already exists");
      }

      const userUnit = await this.categoryService.findOneUnit(unit);

      const createUser = await this.userModel.create({
        name,
        password: Hash.make(password),
        serviceNumber,
        unit: userUnit._id,
        categoryName: (userUnit.category as { name: string }).name,
      });

      return createUser;
    }

    const createUser = await this.userModel.create({
      name: name,
      password: Hash.make(password),
      serviceNumber: serviceNumber,
      role: UserRole.SuperAdmin,
    });

    return createUser;
  }

  async login(data: LoginDto) {
    const { serviceNumber, password } = data;

    const user = await this.userModel
      .findOne({ serviceNumber })
      .populate("unit");

    if (!user) {
      throw new UnauthorizedException("Invalid Credentials");
    }
    const confirmPassword = Hash.compare(password, user.password);

    if (!confirmPassword) {
      throw new UnauthorizedException("Invalid Credentials");
    }

    const payload = {
      id: user._id,
      category: user.categoryName,
      role: user.role,
    };
    const token = this.jwtService.sign(payload);

    return { token, user };
  }

  async appointDivisionComm(id, data: AppointDto) {
    const { userId } = data;
    const user = await this.userModel.findById(id);
    if (user.role === "Super Admin") {
      const user = await this.userModel.findById(userId);
      if (user.categoryName === "Division") {
        await this.userModel.findByIdAndUpdate(userId, {
          role: UserRole.DivisionCommander,
        });
        return { message: "Successful" };
      }
    }
  }

  async appointBrigadeComm(id, data: AppointDto) {
    const { userId } = data;
    const user = await this.userModel.findById(id);
    if (user.role === "Super Admin") {
      const user = await this.userModel.findById(userId);
      if (user.categoryName === "Brigade") {
        await this.userModel.findByIdAndUpdate(userId, {
          role: UserRole.BrigadeCommander,
        });
        return { message: "Successful" };
      }
    }
  }

  async appointBattalionComm(id, data: AppointDto) {
    const { userId } = data;
    const user = await this.userModel.findById(id);
    if (
      user.role === "Brigade Commander" ||
      user.role === "Division Commander" ||
      user.role === "Super Admin"
    ) {
      const user = await this.userModel.findById(userId).populate("unit");

      await this.userModel.findByIdAndUpdate(userId, {
        role: UserRole.UnitCommander,
      });
      return {
        message: `${user.serviceNumber} successfully appointed as ${user.unit.name} Unit Commander `,
      };
    }
  }

  async appointAmourer(id, data: AppointDto) {
    const { userId } = data;
    const commProfile = await this.userModel.findById(id).populate("unit");
    const user = await this.userModel.findById(userId).populate("unit");

    if (
      commProfile.role === UserRole.UnitCommander &&
      commProfile.unit._id.toString() === user.unit._id.toString()
    ) {
      await this.userModel.findByIdAndUpdate(userId, {
        role: UserRole.Amourer,
      });
      return { message: "Successful" };
    }
  }

  async registerWeapon(id, weaponData: WeaponDto) {
    const user = await this.userModel.findById(id).populate("unit");
    if (user.role === "Unit Commander") {
      const commanderData = {
        unitId: user.unit._id,
      };

      return await this.weaponsService.createWeapon(commanderData, weaponData);
    }
  }

  async getWeapons(id, data) {
    const user = await this.userModel.findById(id).populate("unit");
    console.log(user.role)

    if (user.role === "Unit Member" || user.role === "Amourer") {
      const userData = {
        unitId: user.unit._id,
      };
      return await this.weaponsService.getWeaponsByUnitMem(userData);
    }

    if (
      user.role === "Unit Commander" ||
      user.role === "Brigade Commander" ||
      user.role === "Division Commander"
    ) {
      const commanderData = {
        unitId: user.unit._id,
      };
      return await this.weaponsService.getWeaponsByComm(commanderData);
    }
    // if (user.role === "Brigade Commander") {
    //   return await this.weaponsService.getWeaponsByBrigadeComm(data);
    // }
    // if (user.role === "Division Commander") {
    //   return await this.weaponsService.getWeaponsByDivisionComm(data);
    // }
  }

  async signoutWeapon(id, data) {
    const { weaponId, returnDate } = data;
    const user = await this.userModel.findById(id).populate("unit");
    const weapon = await this.weaponsService.getWeaponById(weaponId);

    if (user.unit._id.toString() === weapon.unit._id.toString()) {
      return await this.weaponsService.signoutWeapon(user, data);
    }

    throw new UnauthorizedException("Unauthorised");
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
    return await this.userModel.findById(id).populate("unit");
  }

  async weaponsAwaitApproval(id) {
    const user = await this.userModel.findById(id).populate("unit");
    return await this.weaponsService.weaponsAwaitApproval(user.unit._id);
  }

  async weaponsAwaitRelease(id) {
    const user = await this.userModel.findById(id).populate("unit");
    return await this.weaponsService.weaponsAwaitRelease(user.unit._id);
  }

  async releasedWeapons(id) {
    const user = await this.userModel.findById(id).populate("unit");
    return await this.weaponsService.releasedWeapons(user.unit._id);
  }

  async approveWeapon(id, data) {
    const user = await this.userModel.findById(id).populate("unit");
    if (user.role === UserRole.UnitCommander) {
      return await this.weaponsService.approveWeapon(user.unit._id, data);
    }
  }

  async releaseWeapon(id, data) {
    const user = await this.userModel.findById(id).populate("unit");
    if (user.role === UserRole.Amourer) {
      return await this.weaponsService.releaseWeapon(user.unit._id, data);
    }
  }

  async retrieveWeapon(id, data) {
    const user = await this.userModel.findById(id).populate("unit");
    if (user.role === UserRole.Amourer) {
      return await this.weaponsService.retrieveWeapon(user.unit._id, data);
    }
  }

  async weaponHistory(id) {
    const user = await this.userModel.findById(id);
    return await this.weaponsService.weaponHistory(user._id);
  }

  async getAllUsers() {
    return await this.userModel.find();
  }

  async getAllUnitUsers(id) {
    const user = await this.userModel.findById(id).populate("unit");
    return await this.userModel.find({ unit: user.unit._id });
  }
}
