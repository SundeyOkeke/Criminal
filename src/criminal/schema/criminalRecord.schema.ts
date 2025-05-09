import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, SchemaTypes, Types } from "mongoose";
import { Unit } from "src/categories/schema/unit.schema";
import { User } from "src/user/schema/user.schema";


@Schema({ timestamps: { createdAt: true, updatedAt: true } })
export class CriminalReport {
  @Prop({ required: true })
  report: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: "Unit" })
  unit: Unit;

  @Prop({ type: SchemaTypes.ObjectId, ref: "User" })
  reportedBy:  User;

  @Prop({ type: SchemaTypes.ObjectId, ref: "User" })
  reportTo:  User;

  @Prop()
  createdAt?: Date;

  @Prop()
  updatedAt?: Date;
}

export type CriminalReportDocument = CriminalReport & Document;

export const CriminalReportSchema = SchemaFactory.createForClass(CriminalReport);
