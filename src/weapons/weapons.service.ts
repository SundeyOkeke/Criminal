import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Approval, Availability, Weapon } from "./schema/weapons.schema";
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

  async getWeaponsByComm(commanderData) {
    const { unitId } = commanderData;
    console.log(unitId);
    return await this.weaponModel.find({ unit: unitId });
  }

  // async getWeaponsByBrigadeComm(data) {
  //   if (data.categoryName) {
  //     const { categoryName } = data;
  //     return await this.weaponModel.aggregate([
  //       {
  //         $lookup: {
  //           from: "units", // Replace with the actual name of the collection for the 'Unit' model
  //           localField: "unit",
  //           foreignField: "_id",
  //           as: "unit",
  //         },
  //       },
  //       {
  //         $unwind: "$unit",
  //       },
  //       {
  //         $lookup: {
  //           from: "categories", // Replace with the actual name of the collection for the 'Category' model
  //           localField: "unit.category",
  //           foreignField: "_id",
  //           as: "unit.category",
  //         },
  //       },
  //       {
  //         $unwind: "$unit.category",
  //       },
  //       {
  //         $match: {
  //           $or: [{ "unit.category.name": `${categoryName}` }],
  //         },
  //       },
  //     ]);
  //   }
  //   return await this.weaponModel.aggregate([
  //     {
  //       $lookup: {
  //         from: "units", // Replace with the actual name of the collection for the 'Unit' model
  //         localField: "unit",
  //         foreignField: "_id",
  //         as: "unit",
  //       },
  //     },
  //     {
  //       $unwind: "$unit",
  //     },
  //     {
  //       $lookup: {
  //         from: "categories", // Replace with the actual name of the collection for the 'Category' model
  //         localField: "unit.category",
  //         foreignField: "_id",
  //         as: "unit.category",
  //       },
  //     },
  //     {
  //       $unwind: "$unit.category",
  //     },
  //     {
  //       $match: {
  //         $or: [
  //           { "unit.category.name": "Brigade" },
  //           { "unit.category.name": "Battalion" },
  //         ],
  //       },
  //     },
  //   ]);
  // }

  // async getWeaponsByDivisionComm(data) {
  //   if (data.categoryName) {
  //     const { categoryName } = data;
  //     return await this.weaponModel.aggregate([
  //       {
  //         $lookup: {
  //           from: "units", // Replace with the actual name of the collection for the 'Unit' model
  //           localField: "unit",
  //           foreignField: "_id",
  //           as: "unit",
  //         },
  //       },
  //       {
  //         $unwind: "$unit",
  //       },
  //       {
  //         $lookup: {
  //           from: "categories", // Replace with the actual name of the collection for the 'Category' model
  //           localField: "unit.category",
  //           foreignField: "_id",
  //           as: "unit.category",
  //         },
  //       },
  //       {
  //         $unwind: "$unit.category",
  //       },
  //       {
  //         $match: {
  //           $or: [{ "unit.category.name": `${categoryName}` }],
  //         },
  //       },
  //     ]);
  //   }
  //   return await this.weaponModel.aggregate([
  //     {
  //       $lookup: {
  //         from: "units", // Replace with the actual name of the collection for the 'Unit' model
  //         localField: "unit",
  //         foreignField: "_id",
  //         as: "unit",
  //       },
  //     },
  //     {
  //       $unwind: "$unit",
  //     },
  //     {
  //       $lookup: {
  //         from: "categories", // Replace with the actual name of the collection for the 'Category' model
  //         localField: "unit.category",
  //         foreignField: "_id",
  //         as: "unit.category",
  //       },
  //     },
  //     {
  //       $unwind: "$unit.category",
  //     },
  //     {
  //       $match: {
  //         $or: [
  //           { "unit.category.name": "Brigade" },
  //           { "unit.category.name": "Battalion" },
  //           { "unit.category.name": "Division" },
  //         ],
  //       },
  //     },
  //   ]);
  // }

  async signoutWeapon(user, data) {
    const { weaponId, returnDate } = data;
    const { _id: userId } = user;

  
    const updateData = {
      user: userId,
      signoutDate: new Date(),
      signinDate: convertDateFormat(returnDate),
      approve : Approval.AwaitingApproval
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

  async weaponsAwaitApproval(unit) {
    console.log(unit);
    return await this.weaponModel.find({
      unit: unit,
      availability : "signed out",
      "users": {
        $elemMatch: { "approve": Approval.AwaitingApproval }
      }
    });
  }

  async approveWeapon(unit, data) {
    const { weaponId } = data;
    console.log(unit);
    const weapon = await this.weaponModel.findById(weaponId);
    console.log("heyhey");
    if (weapon.unit._id.toString() === unit.toString()) {
      console.log("hey");
      
      weapon.users.forEach((user) => {
        if (user.approve === Approval.AwaitingApproval) {
          user.approve = Approval.SignoutApproved;
        }
      });
      
      await weapon.save();
      return {message : "Successful"}
    }
  }

  async weaponHistory(userId) {
    const weapons = await this.weaponModel.find({availability :Availability.SignedOut, "users": { $elemMatch: { user: userId } } });
    return weapons;
  }
}


