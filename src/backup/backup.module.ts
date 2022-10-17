import { Module } from '@nestjs/common';
import { BackupService } from './backup.service';
import { BackupController } from './backup.controller';
import { Backup, BackupSchema } from 'src/schemas/backup.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Backup.name, schema: BackupSchema }]),
  ],
  controllers: [BackupController],
  providers: [BackupService]
})
export class BackupModule {}
