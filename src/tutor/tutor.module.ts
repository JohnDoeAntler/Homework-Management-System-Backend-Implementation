import { Module } from '@nestjs/common';
import { TutorService } from './tutor.service';
import { TutorController } from './tutor.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Tutor, TutorSchema } from 'src/schemas/tutor.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Tutor.name, schema: TutorSchema }]),
  ],
  controllers: [TutorController],
  providers: [TutorService]
})
export class TutorModule {}
