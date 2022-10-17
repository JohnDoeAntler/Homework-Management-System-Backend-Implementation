import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Types } from 'mongoose';
import { randint, randstr, rootMongooseTestModule } from 'src/root-mongoose-test-module';
import { Attempt, AttemptSchema } from 'src/schemas/attempt.schema';
import { Submission, SubmissionSchema } from 'src/schemas/submission.schema';
import { CreateSubmissionDto } from './dto/create-submission.dto';
import { SubmissionService } from './submission.service';

describe('SubmissionService', () => {
  let submissionService: SubmissionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        rootMongooseTestModule(),
        MongooseModule.forFeature([{
          name: Attempt.name,
          schema: AttemptSchema, 
          discriminators: [
            {
              name: Submission.name,
              schema: SubmissionSchema, 
            }
          ],
        }]),
      ],
      providers: [SubmissionService],
    }).compile();

    submissionService = module.get<SubmissionService>(SubmissionService);
  });

  const createSubmission = async (props?: CreateSubmissionDto) => {
    const body: CreateSubmissionDto = {
      assignment: new Types.ObjectId(), // TODO: use real assignment
      content: randstr(),
      createdBy: new Types.ObjectId(), // TODO: use real user
      revision: null,
      isFinal: false,
      grades: [{
        progress: randint(100),
        message: randstr(),
        highlights: [{
          start: {
            line: randint(),
            column: randint(),
          },
          end: {
            line: randint(),
            column: randint(),
          },
          color: 'red',
          message: randstr(),
        }],
        score: randint(),
        grader: randstr(),
        createdAt: new Date(),
        updatedAt: new Date(),
      }],
      ...props,
    };

    return submissionService.create(body);
  }

  it('should be able to create submission', async () => {
    const query = {
      assignment: new Types.ObjectId(), // TODO: use real assignment
      content: randstr(),
      createdBy: new Types.ObjectId(), // TODO: use real user
      revision: null,
      isFinal: false,
      grades: [{
        progress: randint(100),
        message: randstr(),
        highlights: [{
          start: {
            line: randint(),
            column: randint(),
          },
          end: {
            line: randint(),
            column: randint(),
          },
          color: 'red',
          message: randstr(),
        }],
        score: randint(),
        grader: randstr(),
        createdAt: new Date(),
        updatedAt: new Date(),
      }],
    };

    const created = await createSubmission(query);

    expect(created).toBeDefined();
    expect(created.assignment).toEqual(query.assignment);
    expect(created.content).toEqual(query.content);
    expect(created.createdBy).toEqual(query.createdBy);
    expect(created.revision).toEqual(query.revision);
    expect(created.isFinal).toEqual(query.isFinal);
    expect(created.grades.length).toEqual(query.grades.length);

    created.grades.forEach((e, i) => {
      const expected = query.grades[i];

      expect(e.progress).toEqual(expected.progress);
      expect(e.message).toEqual(expected.message);
      expect(e.score).toEqual(expected.score);
      expect(e.grader).toEqual(expected.grader);
      expect(e.createdAt).toEqual(expected.createdAt);
      expect(e.updatedAt).toEqual(expected.updatedAt);

      e.highlights.forEach((e, j) => {
        const expected = query.grades[i].highlights[j];

        expect(e.start.line).toEqual(expected.start.line);
        expect(e.start.column).toEqual(expected.start.column);
        expect(e.end.line).toEqual(expected.end.line);
        expect(e.end.column).toEqual(expected.end.column);
        expect(e.color).toEqual(expected.color);
        expect(e.message).toEqual(expected.message);
      });
    });

  });

  it('should be able to query submission (all)', async () => {
    const created = await createSubmission();

    const query = await submissionService.findAll();

    expect(query.some(e => e._id.equals(created._id))).toBeTruthy();
  });

  it('should be able to query submission (single)', async () => {
    const created = await createSubmission();

    const query = await submissionService.findOne(created._id);

    expect(created).toBeDefined();
    expect(created.assignment).toEqual(query.assignment);
    expect(created.content).toEqual(query.content);
    expect(created.createdBy).toEqual(query.createdBy);
    expect(created.revision).toEqual(query.revision);
    expect(created.isFinal).toEqual(query.isFinal);
    expect(created.grades.length).toEqual(query.grades.length);

    created.grades.forEach((e, i) => {
      const expected = query.grades[i];

      expect(e.progress).toEqual(expected.progress);
      expect(e.message).toEqual(expected.message);
      expect(e.score).toEqual(expected.score);
      expect(e.grader).toEqual(expected.grader);
      expect(e.createdAt).toEqual(expected.createdAt);
      expect(e.updatedAt).toEqual(expected.updatedAt);

      e.highlights.forEach((e, j) => {
        const expected = query.grades[i].highlights[j];

        expect(e.start.line).toEqual(expected.start.line);
        expect(e.start.column).toEqual(expected.start.column);
        expect(e.end.line).toEqual(expected.end.line);
        expect(e.end.column).toEqual(expected.end.column);
        expect(e.color).toEqual(expected.color);
        expect(e.message).toEqual(expected.message);
      });
    });
  });

  it('should be able to update submission', async () => {
    const created = await createSubmission();

    const query = {
      assignment: new Types.ObjectId(), // TODO: use real assignment
      content: randstr(),
      createdBy: new Types.ObjectId(), // TODO: use real user
      revision: null,
      isFinal: false,
      grades: [{
        progress: randint(100),
        message: randstr(),
        highlights: [{
          start: {
            line: randint(),
            column: randint(),
          },
          end: {
            line: randint(),
            column: randint(),
          },
          color: 'red',
          message: randstr(),
        }],
        score: randint(),
        grader: randstr(),
        createdAt: new Date(),
        updatedAt: new Date(),
      }],
    }

    const updated = await submissionService.update(created._id, query);

    expect(updated).toBeDefined();
    expect(updated.assignment).toEqual(query.assignment);
    expect(updated.content).toEqual(query.content);
    expect(updated.createdBy).not.toEqual(query.createdBy);
    expect(updated.revision).toEqual(query.revision);
    expect(updated.isFinal).toEqual(query.isFinal);
    expect(updated.grades.length).toEqual(query.grades.length);

    updated.grades.forEach((e, i) => {
      const expected = query.grades[i];

      expect(e.progress).toEqual(expected.progress);
      expect(e.message).toEqual(expected.message);
      expect(e.score).toEqual(expected.score);
      expect(e.grader).toEqual(expected.grader);
      expect(e.createdAt).toEqual(expected.createdAt);
      expect(e.updatedAt).toEqual(expected.updatedAt);

      e.highlights.forEach((e, j) => {
        const expected = query.grades[i].highlights[j];

        expect(e.start.line).toEqual(expected.start.line);
        expect(e.start.column).toEqual(expected.start.column);
        expect(e.end.line).toEqual(expected.end.line);
        expect(e.end.column).toEqual(expected.end.column);
        expect(e.color).toEqual(expected.color);
        expect(e.message).toEqual(expected.message);
      });
    });
  });

  it('should be able to delete submission', async () => {
    const created = await createSubmission();
    
    const removed = await submissionService.remove(created._id);
    const query = await submissionService.findAll();

    expect(removed).toBeDefined();
    expect(query.every(e => !e._id.equals(created._id))).toBeTruthy();
  });

  it('should be defined', () => {
    expect(submissionService).toBeDefined();
  });
});
