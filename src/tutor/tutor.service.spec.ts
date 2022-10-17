import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Types } from 'mongoose';
import { closeInMongodConnection, randstr, rootMongooseTestModule } from 'src/root-mongoose-test-module';
import { Tutor, TutorSchema } from 'src/schemas/tutor.schema';
import { User, UserSchema } from 'src/schemas/user.schema';
import { CreateTutorDto } from './dto/create-tutor.dto';
import { TutorService } from './tutor.service';

describe('TutorService', () => {
  let tutorService: TutorService;

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
      providers: [TutorService],
    }).compile();

    tutorService = module.get<TutorService>(TutorService);
  });

  it('should be defined', () => {
    expect(tutorService).toBeDefined();
  });

  const createTutor = async (props?: CreateTutorDto) => {
    const query = {
      username: randstr(),
      password: randstr(),
      email: randstr(),
      nickname: randstr(),
      altEmails: [],
      courses: [],
      ...props,
    };

    return await tutorService.create(query);
  }

  it('should be able to create tutor', async () => {
    const query = {
      username: randstr(),
      password: randstr(),
      email: randstr(),
      nickname: randstr(),
      altEmails: [],
      courses: [],
    };

    const created = await createTutor(query);

    expect(query.username).toEqual(created.username);
    expect(query.password).toEqual(created.password);
    expect(query.email).toEqual(created.email);
    expect(query.nickname).toEqual(created.nickname);
    expect(query.altEmails).toEqual(created.altEmails);
    expect(query.courses).toEqual(created.courses);
  });

  it('should be able to query tutor (all)', async () => {
    const created = await createTutor();

    const query = await tutorService.findAll();

    expect(query.some(e => e._id.equals(created._id))).toBeTruthy();
  });

  it('should be able to query tutor (single)', async () => {
    const created = await createTutor();

    expect(created).toHaveProperty('_id');

    const query = await tutorService.findOne(created._id);

    expect(query).not.toHaveProperty('username');
    expect(query).not.toHaveProperty('password');

    expect(query.email).toEqual(created.email);
    expect(query.nickname).toEqual(created.nickname);
    expect(query.altEmails).toEqual(created.altEmails);
    expect(query.courses).toEqual(created.courses);
  });

  it('should be able to update tutor', async () => {
    const created = await createTutor();

    const query = {
      username: randstr(),
      password: randstr(),
      email: randstr(),
      nickname: randstr(),
      altEmails: [randstr()],
      courses: [new Types.ObjectId()], // TODO: use new course
    };

    const updated = await tutorService.update(created._id, query);

    expect(updated).not.toHaveProperty('username');
    expect(updated).not.toHaveProperty('password');

    expect(updated.email).not.toEqual(created.email);
    expect(updated.nickname).not.toEqual(created.nickname);
    expect(updated.altEmails).not.toEqual(created.altEmails);
    expect(updated.courses).not.toEqual(created.courses);
  });

  it('should be able to delete tutor', async () => {
    const created = await createTutor();

    const removed = await tutorService.remove(created._id);
    const all = await tutorService.findAll();
    const single = await tutorService.findOne(created._id);

    expect(removed).toBeDefined();
    expect(all.every(e => !e._id.equals(created._id))).toBeTruthy();
    expect(single).toBeDefined();
  });


  afterEach(async () => {
    await closeInMongodConnection();
  });

});
