import { Module } from '@nestjs/common';
import { BackupService } from './backup.service';
import { BackupController } from './backup.controller';

@Module({
  controllers: [BackupController],
  providers: [BackupService]
})
export class BackupModule {}
