import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, LeanDocument, Types } from 'mongoose';
import { User } from './user.schema';

export type CourseDocument = Course & Document;

@Schema({ timestamps: true, versionKey: false })
export class Course {

	@Prop({ required: true })
	name: string;

	@Prop()
	description: string;

	@Prop({ required: true, default: true })
	isActive: boolean;

	@Prop({ type: Types.ObjectId, ref: User.name, required: true, immutable: true })
	createdBy: Types.ObjectId | User;

	@Prop({ type: Types.ObjectId, ref: User.name, required: true })
	updatedBy: Types.ObjectId | User;

}

export const CourseSchema = SchemaFactory.createForClass(Course);
