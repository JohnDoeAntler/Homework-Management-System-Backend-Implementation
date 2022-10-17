import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { rootMongooseTestModule } from 'src/root-mongoose-test-module';
import { Semester, SemesterSchema } from 'src/schemas/semester.schema';
import { SemesterController } from './semester.controller';
import { SemesterService } from './semester.service';

describe('SemesterController', () => {
  let controller: SemesterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        rootMongooseTestModule(),
        MongooseModule.forFeature([{ name: Semester.name, schema: SemesterSchema }]),
      ],
      controllers: [SemesterController],
      providers: [SemesterService],
    }).compile();

    controller = module.get<SemesterController>(SemesterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
