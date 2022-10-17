import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { LeanDocument, Model, ObjectId } from 'mongoose';
import { Assignment, AssignmentDocument } from 'src/schemas/assignment.schema';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { UpdateAssignmentDto } from './dto/update-assignment.dto';

@Injectable()
export class AssignmentService {
  constructor(
    @InjectModel(Assignment.name) private assignmentModel: Model<AssignmentDocument>,
  ) {}

  async create(createAssignmentDto: CreateAssignmentDto) {
    const tmp = new this.assignmentModel(createAssignmentDto);
    await tmp.validate();
    return (await tmp.save()).toJSON<LeanDocument<AssignmentDocument>>();
  }

  async findAll() {
    return await this.assignmentModel.find().lean();
  }

  async findOne(id: ObjectId) {
    return await this.assignmentModel.findById(id).lean();
  }

  async update(id: ObjectId, updateAssignmentDto: UpdateAssignmentDto) {
    return await this.assignmentModel.findByIdAndUpdate(id, updateAssignmentDto, { new: true }).lean();
  }

  async remove(id: ObjectId) {
    return await this.assignmentModel.findByIdAndUpdate(id, { isActive: false }, { new: true }).lean();
  }
}
