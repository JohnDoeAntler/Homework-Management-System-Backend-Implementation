import { Types } from "mongoose";

export class CreateStudentDto {

	readonly username: string;
	readonly password: string;
	readonly email: string;
	readonly nickname: string;
	readonly altEmails: string[];

	readonly studentId: string;
	readonly courses: Types.ObjectId[];

}
