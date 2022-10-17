import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { LeanDocument, Model, ObjectId } from 'mongoose';
import { Student, StudentDocument } from 'src/schemas/student.schema';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@Injectable()
export class StudentService {

  constructor(
    @InjectModel(Student.name) private studentModel: Model<StudentDocument>,
  ) { }

  async create(createStudentDto: CreateStudentDto) {
    const tmp = new this.studentModel({
      ...createStudentDto,
      kind: Student.name,
      isActive: true,
    });

    await tmp.validate();

    return (await tmp.save()).toJSON<LeanDocument<StudentDocument>>();
  }

  async findAll() {
    return await this.studentModel.find({ isActive: true }).lean();
  }

  async findOne(id: ObjectId) {
    return await this.studentModel.findById(id).lean();
  }

  async update(id: ObjectId, updateStudentDto: UpdateStudentDto) {
    return await this.studentModel.findByIdAndUpdate(id, updateStudentDto, { new: true }).lean();
  }

  async remove(id: ObjectId) {
    return await this.studentModel.findByIdAndUpdate(id, { isActive: false }).lean();
  }
}
