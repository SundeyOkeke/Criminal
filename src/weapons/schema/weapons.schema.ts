import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, SchemaTypes, Types } from "mongoose";
import { Unit } from "src/categories/schema/unit.schema";
import { User } from "src/user/schema/user.schema";

export enum Availability {
  Available = "available",
  SignedOut = "signed out",
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

  @Prop({ type: SchemaTypes.ObjectId, ref: "Unit" })
  unit: Unit;

  @Prop({
    type: [{ user: { type: SchemaTypes.ObjectId, ref: "User" }, signoutDate: Date, proposedSigninDate: Date, actualSigninDate: Date, approve: String  }],
    default: [],
  })
  users: { user: Types.ObjectId | User; signoutDate: Date; proposedSigninDate: Date, actualSigninDate: Date, approve: string }[];
}

export type WeaponDocument = Weapon & Document;

export const WeaponSchema = SchemaFactory.createForClass(Weapon);
