import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, SchemaTypes, Types } from "mongoose";
import { Unit } from "src/categories/schema/unit.schema";
import { User } from "src/user/schema/user.schema";


@Schema({ timestamps: { createdAt: true, updatedAt: true } })
export class Criminal {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  dob: string;

  @Prop({ required: true })
  lockUpDate: string;

  @Prop({ required: true })
  releaseDate: string;

  @Prop({ required: true })
  bvn: string;

  @Prop({ required: true })
  nin: string;

  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  phoneNumber: string;

  @Prop({ required: true })
  imageUrl: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: "Unit" })
  unit: Unit;

  @Prop({ type: SchemaTypes.ObjectId, ref: "User" })
  lockedBy:  User;

  @Prop()
  createdAt?: Date;

  @Prop()
  updatedAt?: Date;
}

export type CriminalDocument = Criminal & Document;

export const CriminalSchema = SchemaFactory.createForClass(Criminal);
