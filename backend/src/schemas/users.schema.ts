import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Roles } from './roles.schema';

export type UsersDocument = Users & Document;

export interface IUsers {
  _id: mongoose.ObjectId;
  fullName: string;
  email: string;
}

@Schema({ timestamps: true })
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

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Cases' })
  case: mongoose.ObjectId;

  @Prop({ default: Date.now() })
  createdAt: Date;

  @Prop({ default: Date.now() })
  updatedAt: Date;
}
export const UsersSchema = SchemaFactory.createForClass(Users);
