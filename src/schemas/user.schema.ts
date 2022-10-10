import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

export enum UserType {
	STUDENT,
	TUTOR,
	SYSADMIN,
}

@Schema({ timestamps: true, versionKey: false, discriminatorKey: 'kind' })
export class User {

	@Prop({ required: true, type: Object.values(UserType) })
	kind: UserType;

	@Prop({ required: true, select: false })
	username: string;

	@Prop({ required: true, select: false })
	password: string;

	@Prop({ required: true })
	email: string;

	@Prop()
	nickname: string;

	@Prop({ type: [String] })
	altEmails: string[];

	@Prop({ required: true, default: true })
	isActive: boolean;

}

export const UserSchema = SchemaFactory.createForClass(User);
