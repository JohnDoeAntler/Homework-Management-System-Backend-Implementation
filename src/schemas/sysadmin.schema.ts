import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { UserType } from './user.schema';

export type SysAdminDocument = SysAdmin & Document;

@Schema()
export class SysAdmin {

	kind: UserType.STUDENT;
	username: string;
	password: string;
	email: string;
	nickname: string;
	altEmails: string[];
	isActive: boolean;

}

export const SysAdminSchema = SchemaFactory.createForClass(SysAdmin);
