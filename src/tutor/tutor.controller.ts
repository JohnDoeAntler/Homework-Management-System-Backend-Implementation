import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TutorService } from './tutor.service';
import { CreateTutorDto } from './dto/create-tutor.dto';
import { UpdateTutorDto } from './dto/update-tutor.dto';
import { ParseObjectIdPipePipe } from 'src/parse-object-id-pipe.pipe';
import { ObjectId } from 'mongoose';

@Controller('tutor')
export class TutorController {
  constructor(private readonly tutorService: TutorService) {}

  @Post()
  create(@Body() createTutorDto: CreateTutorDto) {
    return this.tutorService.create(createTutorDto);
  }

  @Get()
  findAll() {
    return this.tutorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseObjectIdPipePipe) id: ObjectId) {
    return this.tutorService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseObjectIdPipePipe) id: ObjectId, @Body() updateTutorDto: UpdateTutorDto) {
    return this.tutorService.update(id, updateTutorDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseObjectIdPipePipe) id: ObjectId) {
    return this.tutorService.remove(id);
  }
}
