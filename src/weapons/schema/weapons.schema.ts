import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, SchemaTypes, Types } from "mongoose";
import { Unit } from "src/categories/schema/unit.schema";

export enum Availability {
  Available = "available",
  SignedOut = "signed out",
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
}

export type WeaponDocument = Weapon & Document;

export const WeaponSchema = SchemaFactory.createForClass(Weapon);
