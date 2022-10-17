import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { rootMongooseTestModule } from 'src/root-mongoose-test-module';
import { Tutor, TutorSchema } from 'src/schemas/tutor.schema';
import { User, UserSchema } from 'src/schemas/user.schema';
import { TutorController } from './tutor.controller';
import { TutorService } from './tutor.service';

describe('TutorController', () => {
  let controller: TutorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        rootMongooseTestModule(),
        MongooseModule.forFeature([{
          name: User.name,
          schema: UserSchema,
          discriminators: [{
            name: Tutor.name,
            schema: TutorSchema,
          }]
        }]),
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
