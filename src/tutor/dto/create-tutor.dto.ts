import { Types } from "mongoose";

export class CreateTutorDto {

	readonly username: string;
	readonly password: string;
	readonly email: string;
	readonly nickname: string;
	readonly altEmails: string[];

	readonly courses: Types.ObjectId[];
}
