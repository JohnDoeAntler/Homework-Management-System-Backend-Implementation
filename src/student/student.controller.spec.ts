import { Test, TestingModule } from '@nestjs/testing';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';
import { closeInMongodConnection, rootMongooseTestModule } from '../root-mongoose-test-module';
import { MongooseModule } from '@nestjs/mongoose';
import { Student, StudentSchema } from '../schemas/student.schema';

describe('StudentController', () => {
  let controller: StudentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        rootMongooseTestModule(),
        MongooseModule.forFeature([{ name: Student.name, schema: StudentSchema }]),
      ],
      controllers: [StudentController],
      providers: [StudentService],
    }).compile();

    controller = module.get<StudentController>(StudentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  afterEach(async () => {
    await closeInMongodConnection();
  });
});
