import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { LeanDocument, Model, ObjectId } from 'mongoose';
import { Tutor, TutorDocument } from 'src/schemas/tutor.schema';
import { CreateTutorDto } from './dto/create-tutor.dto';
import { UpdateTutorDto } from './dto/update-tutor.dto';

@Injectable()
export class TutorService {
  constructor(
    @InjectModel(Tutor.name) private tutorModel: Model<TutorDocument>,
  ) { }

  async create(createTutorDto: CreateTutorDto) {
    const tmp = new this.tutorModel(createTutorDto);
    await tmp.validate();
    return (await tmp.save()).toJSON<LeanDocument<TutorDocument>>();
  }

  async findAll() {
    return await this.tutorModel.find();
  }

  async findOne(id: ObjectId) {
    return await this.tutorModel.findById(id);
  }

  async update(id: ObjectId, updateTutorDto: UpdateTutorDto) {
    return await this.tutorModel.findByIdAndUpdate(id, updateTutorDto);
  }

  async remove(id: ObjectId) {
    return await this.tutorModel.findByIdAndDelete(id);
  }
}
