import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { UserRole } from '../Enum/userRole';

export type UserDocument = User & Document;
@Schema()
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: false })
  contactNo: number;

  @Prop({ required: false })
  DOB: Date;

  @Prop({required:false})
  address:string;

  @Prop({default:UserRole.USER})
  role:string

  @Prop({required:false})
  gender:string
  
  @Prop({default:true})
  IsActive:boolean

  @Prop({ required: false })
  updatedAt: Date; 

  @Prop({ default: Date.now })
  createdAt: Date; 

  
}
  

export const UserSchema = SchemaFactory.createForClass(User)