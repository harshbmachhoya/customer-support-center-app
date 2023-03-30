import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type RolesDocument = Roles & Document;

@Schema()
export class Roles {
  @Prop({ required: true })
  name: string;
}
export const RolesSchema = SchemaFactory.createForClass(Roles);
