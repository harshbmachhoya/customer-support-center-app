import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Roles } from './roles.schema';

export type UsersDocument = Users & Document;

@Schema()
export class Users {
  _id: mongoose.ObjectId;

  @Prop({ required: true })
  fullName: string;

  @Prop({ required: true, unique: true, lowercase: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ type: mongoose.Schema, ref: 'Roles' })
  role: Roles;

  @Prop({ default: Date.now() })
  createdDate: Date;

  @Prop({ default: Date.now() })
  updatedDate: Date;
}
export const UsersSchema = SchemaFactory.createForClass(Users);
