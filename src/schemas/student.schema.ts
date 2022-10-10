import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Semester } from './semester.schema';
import { UserType } from './user.schema';

export type StudentDocument = Student & Document;

@Schema()
export class Student {

	kind: UserType.STUDENT;
	username: string;
	password: string;
	email: string;
	nickname: string;
	altEmails: string[];
	isActive: boolean;

	@Prop({ required: true })
	studentId: string;

	@Prop({ required: true, type: [{
		required: true,
		type: Types.ObjectId,
		ref: Semester.name
	}] })
	courses: Types.ObjectId[] | Semester[];

}

export const StudentSchema = SchemaFactory.createForClass(Student);
