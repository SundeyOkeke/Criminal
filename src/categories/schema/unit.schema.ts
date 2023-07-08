import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { Category } from "./category.schema";
import { User } from "src/user/schema/user.schema";

@Schema()
export class Unit {
  @Prop({ required: false })
  name: string;

  @Prop({ type: Types.ObjectId, ref: "Category" })
  category: Category;

  @Prop({ type: [{ type: Types.ObjectId, ref: "User" }] })
  users: User[];

  _id: Types.ObjectId;
}

export type UnitDocument = Unit & Document;

export const UnitSchema = SchemaFactory.createForClass(Unit);
