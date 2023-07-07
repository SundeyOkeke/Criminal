import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';
import { Unit } from 'src/categories/schema/unit.schema';

export enum UserRole {
  UnitMember = 'unit member',
  UnitCommander = 'unit commander',
  BrigadeCommander = 'brigade commander',
  DivisionCommander = 'division commander',
  SuperAdmin = "super admin"
}

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ unique: [true, 'Service Number exists'] })
  serviceNumber: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'Unit' })
  unit: Unit;

  @Prop({ required: false })
  categoryName: string;

  @Prop({ enum: UserRole, default: UserRole.UnitMember })
  role: UserRole;
}

export type UserDocument = User & Document;

export const UserSchema = SchemaFactory.createForClass(User);