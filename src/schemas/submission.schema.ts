import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Assignment } from './assignment.schema';
import { User } from './user.schema';

@Schema()
export class Position {

	@Prop({ required: true })
	line: number;

	@Prop({ required: true })
	column: number;

}

export const PositionSchema = SchemaFactory.createForClass(Position);

@Schema()
export class Highlight {

	@Prop({ type: PositionSchema, required: true })
	start: Position;

	@Prop({ type: PositionSchema, required: true })
	end: Position;

	@Prop({ required: true, default: 'green' })
	color: string;

	@Prop({ required: true })
	message: string;

}

export const HighlightSchema = SchemaFactory.createForClass(Highlight);

@Schema()
export class Grade {

	@Prop({ required: true, default: 0 })
	progress: number;

	@Prop({ required: true })
	message: string;

	@Prop({ type: [HighlightSchema] })
	highlights: Highlight[];

	@Prop({ required: true, default: 0 })
	score: number;

	@Prop({ required: true })
	grader: string;

	@Prop({ required: true, default: Date.now })
	createdAt: Date; // when processing

	@Prop({ required: true, default: Date.now })
	updatedAt: Date; // when graded

}

export const GradeSchema = SchemaFactory.createForClass(Grade);

export type SubmissionDocument = Submission & Document;

@Schema()
export class Submission {

	kind: String;
	assignment: Types.ObjectId | Assignment;
	content: string
	createdBy: Types.ObjectId | User;

	@Prop({ required: false, type: Types.ObjectId, ref: Submission.name, default: null })
	revision: Types.ObjectId | Submission;

	@Prop({ required: true })
	isFinal: boolean;

	@Prop({ type: [GradeSchema] })
	grades: Grade[];

}

export const SubmissionSchema = SchemaFactory.createForClass(Submission);
