import { Module } from '@nestjs/common';
import { SubmissionService } from './submission.service';
import { SubmissionController } from './submission.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Attempt, AttemptSchema } from 'src/schemas/attempt.schema';
import { Submission, SubmissionSchema } from 'src/schemas/submission.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: Attempt.name,
      schema: AttemptSchema, 
      discriminators: [
        {
          name: Submission.name,
          schema: SubmissionSchema, 
        }
      ],
    }]),
  ],
  controllers: [SubmissionController],
  providers: [SubmissionService]
})
export class SubmissionModule {}
