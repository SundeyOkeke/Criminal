import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Availability, Weapon } from "./schema/weapons.schema";
import { convertDateFormat } from "src/utils/utils";

@Injectable()
export class WeaponsService {
  constructor(@InjectModel("Weapon") private weaponModel: Model<Weapon>) {}

  async createWeapon(commanderData, weaponData) {
    const { unitId } = commanderData;
    console.log(unitId);
    return await this.weaponModel.create({ ...weaponData, unit: unitId });
  }

  async getWeaponsByUnitMem(commanderData) {
    const { unitId } = commanderData;
    console.log(unitId);
    return await this.weaponModel.find({ unit: unitId, availability: "available" }) 
   }

  async getWeaponsByUnitComm(commanderData) {
    const { unitId } = commanderData;
    console.log(unitId);
    return await this.weaponModel.find({ unit: unitId });
  }

  async getWeaponsByBrigadeComm(data) {
    if (data.categoryName) {
      const { categoryName } = data;
      return await this.weaponModel.aggregate([
        {
          $lookup: {
            from: "units", // Replace with the actual name of the collection for the 'Unit' model
            localField: "unit",
            foreignField: "_id",
            as: "unit",
          },
        },
        {
          $unwind: "$unit",
        },
        {
          $lookup: {
            from: "categories", // Replace with the actual name of the collection for the 'Category' model
            localField: "unit.category",
            foreignField: "_id",
            as: "unit.category",
          },
        },
        {
          $unwind: "$unit.category",
        },
        {
          $match: {
            $or: [{ "unit.category.name": `${categoryName}` }],
          },
        },
      ]);
    }
    return await this.weaponModel.aggregate([
      {
        $lookup: {
          from: "units", // Replace with the actual name of the collection for the 'Unit' model
          localField: "unit",
          foreignField: "_id",
          as: "unit",
        },
      },
      {
        $unwind: "$unit",
      },
      {
        $lookup: {
          from: "categories", // Replace with the actual name of the collection for the 'Category' model
          localField: "unit.category",
          foreignField: "_id",
          as: "unit.category",
        },
      },
      {
        $unwind: "$unit.category",
      },
      {
        $match: {
          $or: [
            { "unit.category.name": "Brigade" },
            { "unit.category.name": "Battalion" },
          ],
        },
      },
    ]);
  }

  async getWeaponsByDivisionComm(data) {
    if (data.categoryName) {
      const { categoryName } = data;
      return await this.weaponModel.aggregate([
        {
          $lookup: {
            from: "units", // Replace with the actual name of the collection for the 'Unit' model
            localField: "unit",
            foreignField: "_id",
            as: "unit",
          },
        },
        {
          $unwind: "$unit",
        },
        {
          $lookup: {
            from: "categories", // Replace with the actual name of the collection for the 'Category' model
            localField: "unit.category",
            foreignField: "_id",
            as: "unit.category",
          },
        },
        {
          $unwind: "$unit.category",
        },
        {
          $match: {
            $or: [{ "unit.category.name": `${categoryName}` }],
          },
        },
      ]);
    }
    return await this.weaponModel.aggregate([
      {
        $lookup: {
          from: "units", // Replace with the actual name of the collection for the 'Unit' model
          localField: "unit",
          foreignField: "_id",
          as: "unit",
        },
      },
      {
        $unwind: "$unit",
      },
      {
        $lookup: {
          from: "categories", // Replace with the actual name of the collection for the 'Category' model
          localField: "unit.category",
          foreignField: "_id",
          as: "unit.category",
        },
      },
      {
        $unwind: "$unit.category",
      },
      {
        $match: {
          $or: [
            { "unit.category.name": "Brigade" },
            { "unit.category.name": "Battalion" },
            { "unit.category.name": "Division" },
          ],
        },
      },
    ]);
  }

  async signoutWeapon(user, data) {
    const { weaponId, returnDate } = data;
    const { _id: userId } = user;

  
    const updateData = {
      user: userId,
      signoutDate: new Date(),
      signinDate: convertDateFormat(returnDate)
    };
  
    const signoutWeapon = await this.weaponModel.findByIdAndUpdate(
      weaponId,
      { $push: { users: updateData }, availability:Availability.SignedOut  },
      { new: true }
    );
    console.log(signoutWeapon)
    return signoutWeapon
  }

  async getWeaponById(id) {
    return await this.weaponModel.findById(id).populate("unit");
  }

  // async findOneUnit(unit) {
  //   const findunit = await this.UnitModel.findById(unit).populate("category");
  //   return findunit
  // }
}
