import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ObjectId } from 'mongoose';
import { ParseObjectIdPipePipe } from 'src/parse-object-id-pipe.pipe';
import { BackupService } from './backup.service';
import { CreateBackupDto } from './dto/create-backup.dto';
import { UpdateBackupDto } from './dto/update-backup.dto';

@Controller('backup')
export class BackupController {
  constructor(private readonly backupService: BackupService) {}

  @Post()
  create(@Body() createBackupDto: CreateBackupDto) {
    return this.backupService.create(createBackupDto);
  }

  @Get()
  findAll() {
    return this.backupService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseObjectIdPipePipe) id: ObjectId) {
    return this.backupService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseObjectIdPipePipe) id: ObjectId, @Body() updateBackupDto: UpdateBackupDto) {
    return this.backupService.update(id, updateBackupDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseObjectIdPipePipe) id: ObjectId) {
    return this.backupService.remove(id);
  }
}
