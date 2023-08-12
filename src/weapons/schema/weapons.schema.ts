import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, SchemaTypes, Types } from "mongoose";
import { Unit } from "src/categories/schema/unit.schema";
import { User } from "src/user/schema/user.schema";

export enum Availability {
  Available = "available",
  SignedOut = "signed out",
  Missing = "missing",
}

export enum Approval {
  AwaitingApproval = "Awaiting Approval",
  SigninApproved = "Signed-in Approved",
  AwaitingRelease = "Awaiting Release",
  Released = "Issued",
}

export enum Condition {
  Good = "Good",
  Bad = "Bad",
}

export enum ArmType {
  AK47 = "AK47",
  Pistol = "Pistol",
  FNRifles = "FN Rifles",
  AK47Bullet = "AK47 Bullet",
  PistolBullet = "Pistol Bullet",
  FNRiflesBullet = "FNRifles Bullet",
}

@Schema({ timestamps: true })
export class Weapon {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  DateOfManufacture: string;

  @Prop({ unique: [true, "Weapon Serial Number exists"] })
  serialNumber: string;

  @Prop({ required: true })
  productionDate: string;

  @Prop({ enum: Availability, default: Availability.Available })
  availability: Availability;

  @Prop({ enum: Condition })
  condition: Condition;

  @Prop({ enum: ArmType })
  armType: ArmType;

  @Prop({ type: SchemaTypes.ObjectId, ref: "Unit" })
  unit: Unit;

  @Prop({
    type: [
      {
        user: { type: SchemaTypes.ObjectId, ref: "User" },
        signoutDate: Date,
        proposedSigninDate: Date,
        actualSigninDate: Date,
        approve: String,
        approvedBy: { type: SchemaTypes.ObjectId, ref: "User" },
        releasedBy: { type: SchemaTypes.ObjectId, ref: "User" },
        retrievedBy: { type: SchemaTypes.ObjectId, ref: "User" },
        note: String,
        numRounds: Number,
      },
    ],
    default: [],
  })
  users: {
    user: Types.ObjectId | User;
    signoutDate: Date;
    proposedSigninDate: Date;
    actualSigninDate: Date;
    approve: string;
    approvedBy: Types.ObjectId | User;
    releasedBy: Types.ObjectId | User;
    retrievedBy: Types.ObjectId | User;
    note: string;
    numRounds: number,
  }[];
}

export type WeaponDocument = Weapon & Document;

export const WeaponSchema = SchemaFactory.createForClass(Weapon);
