import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Course, CourseDocument } from '../schemas/course.schema';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Injectable()
export class CourseService {

  constructor(
    @InjectModel(Course.name) private courseModel: Model<CourseDocument>,
  ) { }

  async create(createCourseDto: CreateCourseDto) {
    return await this.courseModel.create(createCourseDto);
  }

  async findAll(updateCourseDto?: UpdateCourseDto) {
    return await this.courseModel.find(updateCourseDto);
  }

  async findOne(id: ObjectId) {
    return await this.courseModel.findById(id);
  }

  async update(id: ObjectId, updateCourseDto: UpdateCourseDto) {
    return await this.courseModel.findByIdAndUpdate(id, updateCourseDto, { new: true });
  }

  async remove(id: ObjectId) {
    return await this.courseModel.findByIdAndDelete(id);
  }
}
