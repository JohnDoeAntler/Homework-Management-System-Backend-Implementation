import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SysAdminDocument = SysAdmin & Document;

@Schema()
export class SysAdmin {

	kind: string;
	username: string;
	password: string;
	email: string;
	nickname: string;
	altEmails: string[];
	isActive: boolean;

}

export const SysAdminSchema = SchemaFactory.createForClass(SysAdmin);
