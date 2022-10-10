import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Assignment } from './assignment.schema';
import { Course } from './course.schema';
import { User } from './user.schema';

export type SemesterDocument = Semester & Document;

export class ScheduledAssignment {

	@Prop({
		type: Types.ObjectId,
		ref: Assignment.name,
		required: true 
	})
	assignment: Types.ObjectId | Assignment;

	@Prop()
	datetime: Date;

}

export const ScheduledAssignmentSchema = SchemaFactory.createForClass(ScheduledAssignment);

@Schema({ timestamps: true, versionKey: false })
export class Semester {

	@Prop({
		type: Types.ObjectId,
		ref: Course.name,
		required: true,
	})
	course: Types.ObjectId | Course;

	@Prop({ required: true, type: [{
		type: Types.ObjectId,
		ref: User.name,
		required: true,
	}] })
	tutors: Types.ObjectId[] | User[];

	@Prop({ required: true, type: [{
		type: Types.ObjectId,
		ref: User.name,
		required: true,
	}] })
	students: Types.ObjectId[] | User[];

	@Prop({ required: true, type: [ScheduledAssignmentSchema] })
	assignments: ScheduledAssignment[];

	@Prop({ type: Types.ObjectId, ref: User.name, required: true, immutable: true })
	createdBy: Types.ObjectId | User;

	@Prop({ type: Types.ObjectId, ref: User.name, required: true })
	updatedBy: Types.ObjectId | User;

}

export const SemesterSchema = SchemaFactory.createForClass(Semester);
