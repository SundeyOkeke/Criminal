import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Unit } from './unit.schema';

@Schema()
export class Category {
  @Prop({ required: false })
  name: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Unit' }] })
  units: Unit[];
}

export type CategoryDocument = Category & Document;

export const CategorySchema = SchemaFactory.createForClass(Category);
