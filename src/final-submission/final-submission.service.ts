import { Injectable } from '@nestjs/common';
import { CreateFinalSubmissionDto } from './dto/create-final-submission.dto';
import { UpdateFinalSubmissionDto } from './dto/update-final-submission.dto';

@Injectable()
export class FinalSubmissionService {
  create(createFinalSubmissionDto: CreateFinalSubmissionDto) {
    return 'This action adds a new finalSubmission';
  }

  findAll() {
    return `This action returns all finalSubmission`;
  }

  findOne(id: number) {
    return `This action returns a #${id} finalSubmission`;
  }

  update(id: number, updateFinalSubmissionDto: UpdateFinalSubmissionDto) {
    return `This action updates a #${id} finalSubmission`;
  }

  remove(id: number) {
    return `This action removes a #${id} finalSubmission`;
  }
}
