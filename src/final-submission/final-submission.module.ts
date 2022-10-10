import { Module } from '@nestjs/common';
import { FinalSubmissionService } from './final-submission.service';
import { FinalSubmissionController } from './final-submission.controller';

@Module({
  controllers: [FinalSubmissionController],
  providers: [FinalSubmissionService]
})
export class FinalSubmissionModule {}
