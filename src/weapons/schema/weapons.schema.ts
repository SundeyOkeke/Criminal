import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, SchemaTypes, Types } from "mongoose";
import { Unit } from "src/categories/schema/unit.schema";
import { User } from "src/user/schema/user.schema";

export enum Availability {
  Available = "available",
  SignedOut = "signed out",
}

export enum Approval {
  SignoutApproved = "Sign-out Approved",
  AwaitingApproval = "Awaiting Approval",
  SigninApproved = "Sign-in Approved",
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

  @Prop({ type: SchemaTypes.ObjectId, ref: "Unit" })
  unit: Unit;

  @Prop({
    type: [{ user: { type: SchemaTypes.ObjectId, ref: "User" }, signoutDate: Date, signinDate: Date, approve: String  }],
    default: [],
  })
  users: { user: Types.ObjectId | User; signoutDate: Date; signinDate: Date, approve: string }[];
}

export type WeaponDocument = Weapon & Document;

export const WeaponSchema = SchemaFactory.createForClass(Weapon);
