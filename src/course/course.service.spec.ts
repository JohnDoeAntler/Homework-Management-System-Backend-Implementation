import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Tutor } from '../schemas/tutor.schema';
import { TutorModule } from '../tutor/tutor.module';
import { TutorService } from '../tutor/tutor.service';
import { closeInMongodConnection, randstr, rootMongooseTestModule } from '../root-mongoose-test-module';
import { Course, CourseSchema } from '../schemas/course.schema';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';

describe('CourseService', () => {
  let courseService: CourseService;
  let tutorService: TutorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        rootMongooseTestModule(),
        MongooseModule.forFeature([{ name: Course.name, schema: CourseSchema }]),
        TutorModule,
      ],
      providers: [CourseService],
    }).compile();

    courseService = module.get<CourseService>(CourseService);
    tutorService = module.get<TutorService>(TutorService);
  });

  it('should be defined', () => {
    expect(courseService).toBeDefined();
  });

  const createCourse = async (props?: Omit<CreateCourseDto, "createdBy" | "updatedBy"> & Pick<Partial<CreateCourseDto>, "createdBy" | "updatedBy">) => {
    const tutor = await tutorService.create({
      username: randstr(),
      password: randstr(),
      email: `${randstr()}@gmail.com`,
      nickname: randstr(),
      altEmails: [],
      courses: [],
    });

    return {
      tutor,
      course: await courseService.create({
        name: randstr(),
        description: randstr(),
        isActive: true,
        createdBy: tutor._id,
        updatedBy: tutor._id,
        ...props,
      }),
    }
  }

  it('should be able to create course', async () => {
    const body = {
      name: randstr(),
      description: randstr(),
      isActive: true,
    }

    const { tutor, course } = await createCourse(body);

    expect(course).toBeDefined();
    expect(course.name).toEqual(body.name);
    expect(course.description).toEqual(body.description);
    expect(course.isActive).toBeTruthy;
    expect(course.createdBy).toEqual(tutor._id);
    expect(course.updatedBy).toEqual(tutor._id);
  });

  it('should be able to query course (all)', async () => {
    const { course } = await createCourse();

    const query = await courseService.findAll();

    expect(query).toBeDefined();
    expect(query.some(e => e._id == course._id));
  });

  it('should be able to query course (single)', async () => {
    const { course } = await createCourse();

    const query = await courseService.findOne(course._id);

    expect(query).toBeDefined();
  });

  it('should be able to update course', async () => {
    const { course: old } = await createCourse();
    const body = {
      name: randstr(),
      description: randstr(),
      isActive: false,
    };

    const updated = await courseService.update(old._id, body);

    expect(updated).toBeDefined();
    expect(updated._id).toEqual(old._id);
    expect(updated.name).not.toEqual(old.name);
    expect(updated.description).not.toEqual(old.description);
    expect(updated.isActive).not.toEqual(old.isActive);
    expect(updated.name).toEqual(body.name);
    expect(updated.description).toEqual(body.description);
    expect(updated.isActive).toEqual(body.isActive);
  });

  it('should be able to delete course', async () => {
    const { course } = await createCourse();

    const removed = await courseService.remove(course._id);
    const query = await courseService.findOne(course._id);

    expect(removed).toBeDefined();
    expect(query).toBeNull();
  });

  afterEach(async () => {
    await closeInMongodConnection();
  });
});
