import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, SchemaTypes } from "mongoose";
import { Unit } from "src/categories/schema/unit.schema";

export enum UserRole {
  UnitMember = "Unit Member",
  UnitCommander = "Unit Commander",
  BrigadeCommander = "Brigade Commander",
  DivisionCommander = "Division Commander",
  SuperAdmin = "Super Admin",
  Amourer = "Amourer",
}

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  password: string;

  @Prop({ unique: [true, "Service Number exists"] })
  serviceNumber: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: "Unit" })
  unit: Unit;

  @Prop({ required: false })
  categoryName: string;

  @Prop({ enum: UserRole, default: UserRole.UnitMember })
  role: UserRole;
  _id: any | User;
}

export type UserDocument = User & Document;

export const UserSchema = SchemaFactory.createForClass(User);
