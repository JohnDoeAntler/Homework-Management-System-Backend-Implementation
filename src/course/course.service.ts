import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { LeanDocument, Model, ObjectId } from 'mongoose';
import { Course, CourseDocument } from '../schemas/course.schema';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Injectable()
export class CourseService {

  constructor(
    @InjectModel(Course.name) private courseModel: Model<CourseDocument>,
  ) { }

  async create(createCourseDto: CreateCourseDto) {
    const tmp = new this.courseModel(createCourseDto);

    await tmp.validate();

    return (await tmp.save()).toJSON<LeanDocument<CourseDocument>>();
  }

  async findAll(updateCourseDto?: UpdateCourseDto) {
    return await this.courseModel.find(updateCourseDto).lean();
  }

  async findOne(id: ObjectId) {
    return await this.courseModel.findById(id).lean();
  }

  async update(id: ObjectId, updateCourseDto: UpdateCourseDto) {
    return await this.courseModel.findByIdAndUpdate(id, updateCourseDto, { new: true }).lean();
  }

  async remove(id: ObjectId) {
    return await this.courseModel.findByIdAndDelete(id).lean();
  }
}
