import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { closeInMongodConnection, rootMongooseTestModule } from 'src/root-mongoose-test-module';
import { TutorSchema } from 'src/schemas/tutor.schema';
import { Tutor } from './entities/tutor.entity';
import { TutorService } from './tutor.service';

describe('TutorService', () => {
  let service: TutorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        rootMongooseTestModule(),
        MongooseModule.forFeature([{ name: Tutor.name, schema: TutorSchema }]),
      ],
      providers: [TutorService],
    }).compile();

    service = module.get<TutorService>(TutorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  afterEach(async () => {
    await closeInMongodConnection();
  });

});
