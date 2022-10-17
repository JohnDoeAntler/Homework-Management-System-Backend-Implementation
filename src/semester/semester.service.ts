import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { LeanDocument, Model, ObjectId } from 'mongoose';
import { Semester, SemesterDocument } from 'src/schemas/semester.schema';
import { CreateSemesterDto } from './dto/create-semester.dto';
import { UpdateSemesterDto } from './dto/update-semester.dto';

@Injectable()
export class SemesterService {
  constructor(
    @InjectModel(Semester.name) private semesterModel: Model<SemesterDocument>,
  ) { }

  async create(createSemesterDto: CreateSemesterDto) {
    const tmp = new this.semesterModel(createSemesterDto);
    await tmp.validate();
    return (await tmp.save()).toJSON<LeanDocument<SemesterDocument>>();
  }

  async findAll() {
    return await this.semesterModel.find();
  }

  async findOne(id: ObjectId) {
    return await this.semesterModel.findById(id);
  }

  async update(id: ObjectId, updateSemesterDto: UpdateSemesterDto) {
    return await this.semesterModel.findByIdAndUpdate(id, updateSemesterDto, { new: true });
  }

  async remove(id: ObjectId) {
    return await this.semesterModel.findByIdAndUpdate(id, { isActive: false }, { new: true });
  }
}
