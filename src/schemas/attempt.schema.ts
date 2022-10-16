import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Assignment } from './assignment.schema';
import { User } from './user.schema';

export type AttemptDocument = Attempt & Document;

export enum AttemptType {
	BACKUP,
	SUBMISSION,
}

@Schema({ timestamps: true, versionKey: false, discriminatorKey: 'kind' })
export class Attempt {

	@Prop({ required: true, type: AttemptType, default: AttemptType.BACKUP })
	kind: AttemptType;

	@Prop({ required: true, type: Types.ObjectId, ref: Assignment.name })
	assignment: Types.ObjectId | Assignment;

	@Prop({ required: true })
	content: string

	@Prop({ required: false, type: Types.ObjectId, ref: Attempt.name, default: null })
	revision: Types.ObjectId | Attempt;

	@Prop({ type: Types.ObjectId, ref: User.name, required: true, immutable: true })
	createdBy: Types.ObjectId | User;

}

export const AttemptSchema = SchemaFactory.createForClass(Attempt);
