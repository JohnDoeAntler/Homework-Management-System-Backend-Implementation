import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { rootMongooseTestModule } from 'src/root-mongoose-test-module';
import { TutorSchema } from 'src/schemas/tutor.schema';
import { Tutor } from './entities/tutor.entity';
import { TutorController } from './tutor.controller';
import { TutorService } from './tutor.service';

describe('TutorController', () => {
  let controller: TutorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        rootMongooseTestModule(),
        MongooseModule.forFeature([{ name: Tutor.name, schema: TutorSchema }]),
      ],
      controllers: [TutorController],
      providers: [TutorService],
    }).compile();

    controller = module.get<TutorController>(TutorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
