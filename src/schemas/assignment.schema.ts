import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Course } from './course.schema';
import { User } from './user.schema';

export type AssignmentDocument = Assignment & Document;

@Schema({ timestamps: true, versionKey: false })
export class Assignment {

	@Prop({ required: true })
	name: string;

	@Prop({ required: false })
	description: string;

	@Prop({ type: Types.ObjectId, ref: Course.name, required: true })
	course: Types.ObjectId | Course;

	/**
	 * TEMPLATE SUGGESTION
	 */
	@Prop({ required: false })
	week: number;

	/**
	 * PARSER & VALIDATOR GENERATION OPTIONS
	 */
	@Prop({ required: false, select: false })
	parsingRules: string;

	@Prop({ required: false, select: false })
	semanticRules: string;

	@Prop({ type: Types.ObjectId, ref: User.name, required: true, immutable: true })
	createdBy: Types.ObjectId | User;

	@Prop({ type: Types.ObjectId, ref: User.name, required: true })
	updatedBy: Types.ObjectId | User;

}

export const AssignmentSchema = SchemaFactory.createForClass(Assignment);
