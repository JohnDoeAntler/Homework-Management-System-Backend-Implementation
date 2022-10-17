import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true, discriminatorKey: 'kind' })
export class User {

	@Prop({
		type: String,
		required: true,
		enum: [
			'Student',
			'Tutor',
			'SysAdmin',
		],
	})
	kind: string;

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

	@Prop({ required: true, default: true, select: false })
	isActive: boolean;

}

export const UserSchema = SchemaFactory.createForClass(User);
