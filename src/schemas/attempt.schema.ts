import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Assignment } from './assignment.schema';
import { User } from './user.schema';

export type AttemptDocument = Attempt & Document;

@Schema({ timestamps: true, discriminatorKey: 'kind' })
export class Attempt {

	@Prop({
		required: true,
		type: String,
		enum: [
			"Backup",
			"Submission",
		],
	})
	kind: string;

	@Prop({ required: true, type: Types.ObjectId, ref: Assignment.name })
	assignment: Types.ObjectId | Assignment;

	@Prop({ required: true })
	content: string

	@Prop({ type: Types.ObjectId, ref: User.name, required: true, immutable: true })
	createdBy: Types.ObjectId | User;

}

export const AttemptSchema = SchemaFactory.createForClass(Attempt);
