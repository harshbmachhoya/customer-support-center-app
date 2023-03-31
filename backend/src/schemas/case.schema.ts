import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Users, UsersSchema } from './users.schema';

export type CasesDocument = Cases & Document;

@Schema()
export class Cases {
  _id: mongoose.ObjectId;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: UsersSchema })
  supportAgent: Users;

  @Prop({ default: false })
  isResolved: boolean;

  @Prop({ default: Date.now() })
  createdDate: Date;

  @Prop({ default: Date.now() })
  updatedDate: Date;
}
export const CasesSchema = SchemaFactory.createForClass(Cases);
