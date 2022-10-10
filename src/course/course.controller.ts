import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ObjectId } from 'mongoose';
import { ParseObjectIdPipePipe } from '../parse-object-id-pipe.pipe';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post()
  create(@Body() createCourseDto: CreateCourseDto) {
    return this.courseService.create(createCourseDto);
  }

  @Get()
  findAll() {
    return this.courseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseObjectIdPipePipe) id: ObjectId) {
    return this.courseService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseObjectIdPipePipe) id: ObjectId, @Body() updateCourseDto: UpdateCourseDto) {
    return this.courseService.update(id, updateCourseDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseObjectIdPipePipe) id: ObjectId) {
    return this.courseService.remove(id);
  }
}
