import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { LeanDocument, Model, ObjectId } from 'mongoose';
import { Backup, BackupDocument } from 'src/schemas/backup.schema';
import { CreateBackupDto } from './dto/create-backup.dto';
import { UpdateBackupDto } from './dto/update-backup.dto';

@Injectable()
export class BackupService {
  constructor(
    @InjectModel(Backup.name) private backupModel: Model<BackupDocument>,
  ) {}

  async create(createBackupDto: CreateBackupDto) {
    const tmp = new this.backupModel(createBackupDto);
    await tmp.validate();
    return (await tmp.save()).toJSON<LeanDocument<BackupDocument>>();
  }

  async findAll() {
    return await this.backupModel.find().lean();
  }

  async findOne(id: ObjectId) {
    return await this.backupModel.findById(id).lean();
  }

  async update(id: ObjectId, updateBackupDto: UpdateBackupDto) {
    return await this.backupModel.findByIdAndUpdate(id, updateBackupDto, { new: true }).lean();
  }

  async remove(id: ObjectId) {
    return await this.backupModel.findByIdAndDelete(id).lean();
  }
}
