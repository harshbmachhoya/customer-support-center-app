import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { IUsers } from './users.schema';

export type CasesDocument = Cases & Document;

@Schema({ timestamps: true })
export class Cases {
  _id: mongoose.ObjectId;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: Object, default: null })
  supportAgent: IUsers;

  @Prop({ default: false })
  isResolved: boolean;

  @Prop({ default: Date.now() })
  createdAt: Date;

  @Prop({ default: Date.now() })
  updatedAt: Date;
}
export const CasesSchema = SchemaFactory.createForClass(Cases);
