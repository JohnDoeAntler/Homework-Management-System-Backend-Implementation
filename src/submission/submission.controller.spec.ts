import { Test, TestingModule } from '@nestjs/testing';
import { SubmissionController } from './submission.controller';
import { SubmissionService } from './submission.service';
import { rootMongooseTestModule } from '../root-mongoose-test-module';
import { MongooseModule } from '@nestjs/mongoose';
import { Attempt, AttemptSchema } from 'src/schemas/attempt.schema';
import { Submission, SubmissionSchema } from 'src/schemas/submission.schema';

describe('SubmissionController', () => {
  let controller: SubmissionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        rootMongooseTestModule(),
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
      providers: [SubmissionService],
    }).compile();

    controller = module.get<SubmissionController>(SubmissionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
