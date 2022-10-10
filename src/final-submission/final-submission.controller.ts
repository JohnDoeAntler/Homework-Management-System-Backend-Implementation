import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FinalSubmissionService } from './final-submission.service';
import { CreateFinalSubmissionDto } from './dto/create-final-submission.dto';
import { UpdateFinalSubmissionDto } from './dto/update-final-submission.dto';

@Controller('final-submission')
export class FinalSubmissionController {
  constructor(private readonly finalSubmissionService: FinalSubmissionService) {}

  @Post()
  create(@Body() createFinalSubmissionDto: CreateFinalSubmissionDto) {
    return this.finalSubmissionService.create(createFinalSubmissionDto);
  }

  @Get()
  findAll() {
    return this.finalSubmissionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.finalSubmissionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFinalSubmissionDto: UpdateFinalSubmissionDto) {
    return this.finalSubmissionService.update(+id, updateFinalSubmissionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.finalSubmissionService.remove(+id);
  }
}
