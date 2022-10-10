import { Test, TestingModule } from '@nestjs/testing';
import { FinalSubmissionService } from './final-submission.service';

describe('FinalSubmissionService', () => {
  let service: FinalSubmissionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FinalSubmissionService],
    }).compile();

    service = module.get<FinalSubmissionService>(FinalSubmissionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
