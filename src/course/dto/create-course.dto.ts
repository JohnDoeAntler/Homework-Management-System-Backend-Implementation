import { CourseDocument } from "src/schemas/course.schema";
import { LeanDocument, Types } from 'mongoose';
import { User } from "src/schemas/user.schema";

export class CreateCourseDto {
	readonly name: string;
	readonly description: string;
	readonly isActive: boolean;
	readonly createdBy: Types.ObjectId | User;
	readonly updatedBy: Types.ObjectId | User;
}
