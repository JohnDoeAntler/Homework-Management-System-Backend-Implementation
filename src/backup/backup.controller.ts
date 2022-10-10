import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
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
  findOne(@Param('id') id: string) {
    return this.backupService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBackupDto: UpdateBackupDto) {
    return this.backupService.update(+id, updateBackupDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.backupService.remove(+id);
  }
}
