import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Student, StudentSchema } from 'src/schemas/student.schema';
import { User, UserSchema } from 'src/schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: User.name,
      schema: UserSchema, 
      discriminators: [
        {
          name: Student.name,
          schema: StudentSchema, 
        }
      ],
    }]),
  ],
  controllers: [StudentController],
  providers: [StudentService]
})
export class StudentModule {}
