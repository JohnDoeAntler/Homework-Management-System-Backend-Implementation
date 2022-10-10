import { Test, TestingModule } from '@nestjs/testing';
import { FinalSubmissionController } from './final-submission.controller';
import { FinalSubmissionService } from './final-submission.service';

describe('FinalSubmissionController', () => {
  let controller: FinalSubmissionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FinalSubmissionController],
      providers: [FinalSubmissionService],
    }).compile();

    controller = module.get<FinalSubmissionController>(FinalSubmissionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
