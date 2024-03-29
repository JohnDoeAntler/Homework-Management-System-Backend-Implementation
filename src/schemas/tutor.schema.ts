import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Semester } from './semester.schema';

export type TutorDocument = Tutor & Document;

@Schema()
export class Tutor {

	kind: string;
	username: string;
	password: string;
	email: string;
	nickname: string;
	altEmails: string[];
	isActive: boolean;

	@Prop({ required: true, type: [{
		type: Types.ObjectId,
		ref: Semester.name,
	}] })
	courses: Types.ObjectId[] | Semester[];

}

export const TutorSchema = SchemaFactory.createForClass(Tutor);
