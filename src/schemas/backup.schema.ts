import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Assignment } from './assignment.schema';
import { User } from './user.schema';

export type BackupDocument = Backup & Document;

@Schema()
export class Backup {

	kind: string;
	assignment: Types.ObjectId | Assignment;
	content: string
	createdBy: Types.ObjectId | User;

}

export const BackupSchema = SchemaFactory.createForClass(Backup);
