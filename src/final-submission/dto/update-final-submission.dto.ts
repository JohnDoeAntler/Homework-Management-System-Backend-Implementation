import { PartialType } from '@nestjs/mapped-types';
import { CreateFinalSubmissionDto } from './create-final-submission.dto';

export class UpdateFinalSubmissionDto extends PartialType(CreateFinalSubmissionDto) {}
