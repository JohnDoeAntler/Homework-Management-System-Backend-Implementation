import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { rootMongooseTestModule } from 'src/root-mongoose-test-module';
import { Semester, SemesterSchema } from 'src/schemas/semester.schema';
import { SemesterService } from './semester.service';

describe('SemesterService', () => {
  let service: SemesterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        rootMongooseTestModule(),
        MongooseModule.forFeature([{ name: Semester.name, schema: SemesterSchema }]),
      ],
      providers: [SemesterService],
    }).compile();

    service = module.get<SemesterService>(SemesterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
