import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import {
  Approval,
  Availability,
  Condition,
  Weapon,
} from "./schema/weapons.schema";
import { convertDateTimeFormat } from "src/utils/utils";
import { UserData } from "./dto/weapons.dto";
import { Equal } from "typeorm";

@Injectable()
export class WeaponsService {
  constructor(@InjectModel("Weapon") private weaponModel: Model<Weapon>) {}

  async createWeapon(commanderData, weaponData) {
    const { unitId } = commanderData;
    return await this.weaponModel.create({ ...weaponData, unit: unitId });
  }

  async getWeaponsByUnitMem(commanderData) {
    const { unitId } = commanderData;
    return await this.weaponModel.find({
      unit: unitId,
      availability: "available",
      condition: Condition.Good,
    });
  }

  async getWeaponsByComm(commanderData) {
    const { unitId } = commanderData;
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
    const { weaponId, returnDate, numRounds } = data;
    const { _id: userId } = user;

    const updateData = {
      user: userId,
      signoutDate: new Date(),
      proposedSigninDate: convertDateTimeFormat(returnDate),
      approve: Approval.AwaitingApproval,
      actualSigninDate: "",
      approvedBy: null,
      releasedBy: null,
      retrievedBy: null,
      numRounds : numRounds
    };

    const signoutWeapon = await this.weaponModel.findByIdAndUpdate(
      weaponId,
      { $push: { users: updateData }, availability: Availability.SignedOut },
      { new: true }
    );
    return signoutWeapon;
  }

  async getWeaponById(id) {
    return await this.weaponModel
      .findById(id)
      .populate("unit")
      .populate("users.user")
      .populate("users.approvedBy")
      .populate("users.releasedBy")
      .populate("users.retrievedBy");
  }

  async weaponsAwaitApproval(unit) {
    return await this.weaponModel
      .find({
        unit: unit,
        availability: "signed out",
        users: {
          $elemMatch: { approve: Approval.AwaitingApproval },
        },
      })
      .populate("users.user");
  }

  async weaponsAwaitRelease(unit) {
    return await this.weaponModel
      .find({
        unit: unit,
        availability: "signed out",
        users: {
          $elemMatch: { approve: Approval.AwaitingRelease },
        },
      })
      .populate("users.user");
  }

  async releasedWeapons(unit) {
    return await this.weaponModel
      .find({
        unit: unit,
        availability: "signed out",
        users: {
          $elemMatch: { approve: Approval.Released },
        },
      })
      .populate("users.user");
  }

  async approveWeapon(commUser, data) {
    const { weaponId } = data;
    const { _id: userId } = commUser;
    const weapon = await this.weaponModel.findById(weaponId);
    if (weapon.unit._id.toString() === commUser.unit._id.toString()) {
      weapon.users.forEach((user) => {
        if (user.approve === Approval.AwaitingApproval) {
          user.approve = Approval.AwaitingRelease;
          user.approvedBy = userId;
        }
      });

      await weapon.save();
      return { message: "Successful" };
    }
  }

  async releaseWeapon(amourer, data) {
    const { weaponId } = data;
    const { _id: userId } = amourer;
    const weapon = await this.weaponModel.findById(weaponId);

    if (weapon.unit._id.toString() === amourer.unit._id.toString()) {
      console.log("hey");
      weapon.users.forEach((user) => {
        if (user.approve === Approval.AwaitingRelease) {
          user.approve = Approval.Released;
          user.releasedBy = userId;
        }
      });

      await weapon.save();
      return { message: "Successful" };
    }
    console.log("hey");
  }

  async retrieveWeapon(amourer, data) {
    const { weaponId, condition, note } = data;
    const { _id: userId } = amourer;
    const weapon = await this.weaponModel.findById(weaponId);
    if (weapon.unit._id.toString() === amourer.unit._id.toString()) {
      if (condition === Availability.Missing) {
        weapon.users.forEach((user) => {
          if (user.approve === Approval.Released) {
            user.actualSigninDate = new Date();
            user.retrievedBy = userId;
            user.note = note;
          }
        });
        (weapon.availability = Availability.Missing), await weapon.save();
        return { message: "Successful" };
      }

      weapon.users.forEach((user) => {
        if (user.approve === Approval.Released) {
          user.approve = Approval.SigninApproved;
          user.actualSigninDate = new Date();
          user.retrievedBy = userId;
          user.note = note;
        }
      });
      (weapon.availability = Availability.Available),
        (weapon.condition = condition);

      await weapon.save();
      return { message: "Successful" };
    }
  }

  async weaponHistory(userId): Promise<UserData[]> {
    const weapons = await this.weaponModel.find({
      $or: [
        { availability: Availability.SignedOut, "users.user": userId },
        { availability: Availability.Available, "users.user": userId },
        { availability: Availability.Missing, "users.user": userId },
      ],
    });

    const filteredWeapons = weapons.map((weapon) => {
      const usersData = weapon.users
        .filter((user) => user.user.toString() === userId.toString())
        .map((user) => ({
          name: weapon.name,
          serialNumber: weapon.serialNumber,
          availability: weapon.availability,
          signoutDate: user.signoutDate,
          actualSigninDate: user.actualSigninDate,
          approve: user.approve,
        }));

      return usersData;
    });

    // Flatten the filteredWeapons array and sort based on signoutDate
    const flattenedWeapons = filteredWeapons
      .flat()
      .sort((a: UserData, b: UserData) => {
        return (
          new Date(a.signoutDate).getTime() - new Date(b.signoutDate).getTime()
        );
      });

    return flattenedWeapons;
  }
  async getUnitWeapons(unitId) {
    return await this.weaponModel.find({ unit: unitId }).populate("unit");
  }

  async allWeapons() {
    return await this.weaponModel
      .find()
      .populate("unit")
      .populate("users.user")
      .populate("users.approvedBy")
      .populate("users.releasedBy")
      .populate("users.retrievedBy");
  }

  async getWeaponByArmType(user, armType) {
    const weapons = await this.weaponModel.find({
      armType: armType,
      unit: user,
      availability: "available",
      condition: Condition.Good,
    });

    console.log(weapons);

    if (weapons.length > 1) {
      const randomIndex = Math.floor(Math.random() * weapons.length);
      return weapons[randomIndex];
    } else if (weapons.length === 1) {
      return weapons[0];
    } else {
      return null;
    }
  }
}
