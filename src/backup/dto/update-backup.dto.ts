import { PartialType } from '@nestjs/mapped-types';
import { CreateBackupDto } from './create-backup.dto';

export class UpdateBackupDto extends PartialType(CreateBackupDto) {}
