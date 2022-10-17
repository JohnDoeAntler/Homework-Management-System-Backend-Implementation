import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { ParseObjectIdPipePipe } from 'src/parse-object-id-pipe.pipe';
import { ObjectId } from 'mongoose';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post()
  create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentService.create(createStudentDto);
  }

  @Get()
  findAll() {
    return this.studentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseObjectIdPipePipe) id: ObjectId) {
    return this.studentService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseObjectIdPipePipe) id: ObjectId, @Body() updateStudentDto: UpdateStudentDto) {
    return this.studentService.update(id, updateStudentDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseObjectIdPipePipe) id: ObjectId) {
    return this.studentService.remove(id);
  }
}
