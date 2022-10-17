import { Test, TestingModule } from '@nestjs/testing';
import { StudentService } from './student.service';
import { closeInMongodConnection, randstr, rootMongooseTestModule } from '../root-mongoose-test-module';
import { MongooseModule } from '@nestjs/mongoose';
import { Student, StudentSchema } from 'src/schemas/student.schema';
import { CreateStudentDto } from './dto/create-student.dto';
import { User, UserSchema } from 'src/schemas/user.schema';
import { Types } from 'mongoose';

describe('StudentService', () => {
  let studentService: StudentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        rootMongooseTestModule(),
        MongooseModule.forFeature([{
          name: User.name,
          schema: UserSchema,
          discriminators: [
            { name: Student.name, schema: StudentSchema }
          ]
        }]),
      ],
      providers: [StudentService],
    }).compile();

    studentService = module.get<StudentService>(StudentService);
  });

  it('should be defined', () => {
    expect(studentService).toBeDefined();
  });

  const createStudent = async (props?: CreateStudentDto) => {
    const query = {
      username: randstr(),
      password: randstr(),
      email: randstr(),
      nickname: randstr(),
      altEmails: [],
      studentId: randstr(),
      courses: [],
      ...props,
    };

    return await studentService.create(query);
  }

  it('should be able to create student', async () => {
    const query = {
      username: randstr(),
      password: randstr(),
      email: randstr(),
      nickname: randstr(),
      altEmails: [],
      studentId: randstr(),
      courses: [],
    };

    const created = await createStudent(query);

    expect(query.username).toEqual(created.username);
    expect(query.password).toEqual(created.password);
    expect(query.email).toEqual(created.email);
    expect(query.nickname).toEqual(created.nickname);
    expect(query.altEmails).toEqual(created.altEmails);
    expect(query.studentId).toEqual(created.studentId);
    expect(query.courses).toEqual(created.courses);
  });

  it('should be able to query student (all)', async () => {
    const created = await createStudent();

    const query = await studentService.findAll();

    expect(query.some(e => e._id.equals(created._id))).toBeTruthy();
  });

  it('should be able to query student (single)', async () => {
    const created = await createStudent();

    expect(created).toHaveProperty('_id');

    const query = await studentService.findOne(created._id);

    expect(query).not.toHaveProperty('username');
    expect(query).not.toHaveProperty('password');

    expect(query.email).toEqual(created.email);
    expect(query.nickname).toEqual(created.nickname);
    expect(query.altEmails).toEqual(created.altEmails);
    expect(query.studentId).toEqual(created.studentId);
    expect(query.courses).toEqual(created.courses);
  });

  it('should be able to update student', async () => {
    const created = await createStudent();

    const query = {
      username: randstr(),
      password: randstr(),
      email: randstr(),
      nickname: randstr(),
      altEmails: [randstr()],
      studentId: randstr(),
      courses: [new Types.ObjectId()], // TODO: use new course
    };

    const updated = await studentService.update(created._id, query);

    expect(updated).not.toHaveProperty('username');
    expect(updated).not.toHaveProperty('password');

    expect(updated.email).not.toEqual(created.email);
    expect(updated.nickname).not.toEqual(created.nickname);
    expect(updated.altEmails).not.toEqual(created.altEmails);
    expect(updated.studentId).not.toEqual(created.studentId);
    expect(updated.courses).not.toEqual(created.courses);
  });

  it('should be able to delete student', async () => {
    const created = await createStudent();

    const removed = await studentService.remove(created._id);
    const query = await studentService.findAll();

    expect(removed).toBeDefined();
    expect(query.every(e => !e._id.equals(created._id))).toBeTruthy();
  });

  afterEach(async () => {
    await closeInMongodConnection();
  });
});
