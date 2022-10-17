import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SemesterService } from './semester.service';
import { CreateSemesterDto } from './dto/create-semester.dto';
import { UpdateSemesterDto } from './dto/update-semester.dto';
import { ParseObjectIdPipePipe } from 'src/parse-object-id-pipe.pipe';
import { ObjectId } from 'mongoose';

@Controller('semester')
export class SemesterController {
  constructor(private readonly semesterService: SemesterService) {}

  @Post()
  create(@Body() createSemesterDto: CreateSemesterDto) {
    return this.semesterService.create(createSemesterDto);
  }

  @Get()
  findAll() {
    return this.semesterService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseObjectIdPipePipe) id: ObjectId) {
    return this.semesterService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseObjectIdPipePipe) id: ObjectId, @Body() updateSemesterDto: UpdateSemesterDto) {
    return this.semesterService.update(id, updateSemesterDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseObjectIdPipePipe) id: ObjectId) {
    return this.semesterService.remove(id);
  }
}
