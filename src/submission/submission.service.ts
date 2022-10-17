import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { LeanDocument, Model, ObjectId } from 'mongoose';
import { Submission, SubmissionDocument } from 'src/schemas/submission.schema';
import { CreateSubmissionDto } from './dto/create-submission.dto';
import { UpdateSubmissionDto } from './dto/update-submission.dto';

@Injectable()
export class SubmissionService {
  constructor(
    @InjectModel(Submission.name) private submissionModel: Model<SubmissionDocument>,
  ) { }

  async create(createSubmissionDto: CreateSubmissionDto) {
    const tmp = new this.submissionModel(createSubmissionDto);
    await tmp.validate();
    return (await tmp.save()).toJSON<LeanDocument<SubmissionDocument>>();
  }

  async findAll() {
    return await this.submissionModel.find().lean();
  }

  async findOne(id: ObjectId) {
    return await this.submissionModel.findById(id).lean();
  }

  async update(id: ObjectId, updateSubmissionDto: UpdateSubmissionDto) {
    // TODO: could not perform update if obj.isFinal is true
    return await this.submissionModel.findByIdAndUpdate(id, updateSubmissionDto, { new: true }).lean();
  }

  async remove(id: ObjectId) {
    // TODO: could not perform update if obj.isFinal is true
    return await this.submissionModel.findByIdAndDelete(id).lean();
  }
}
