import { Types } from "mongoose";

export interface Position {
	readonly line: number;
	readonly column: number;
}

export interface Highlight {
	readonly start: Position;
	readonly end: Position;
	readonly color?: string;
	readonly message: string;
}

export interface Grade {
	readonly progress: number;
	readonly message: string;
	readonly highlights: Highlight[];
	readonly score: number;
	readonly grader: string;
	readonly createdAt: Date; // when processing
	readonly updatedAt: Date; // when graded
}

export class CreateSubmissionDto {
	readonly assignment: Types.ObjectId;
	readonly content: string
	readonly createdBy: Types.ObjectId;

	readonly revision: Types.ObjectId;
	readonly isFinal: boolean;

	readonly grades: Grade[];
}
