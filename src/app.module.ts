import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User, UserSchema } from './schemas/user.schema';
import { StudentModule } from './student/student.module';
import { TutorModule } from './tutor/tutor.module';
import { CourseModule } from './course/course.module';
import { BackupModule } from './backup/backup.module';
import { SubmissionModule } from './submission/submission.module';
import { AssignmentModule } from './assignment/assignment.module';
import { SemesterModule } from './semester/semester.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: `mongodb://${
          configService.get<string>('MONGO_ROOT_USERNAME')
        }:${
          configService.get<string>('MONGO_ROOT_PASSWORD')
        }@${
          configService.get<string>('MONGO_HOSTNAME')
        }:${
          configService.get<string>('MONGO_PORT')
        }/${
          configService.get<string>('MONGO_DATABASE')
        }`,
      }),
      inject: [ConfigService],
    }),
    // users
    StudentModule,
    TutorModule,
    // course
    CourseModule,
    // assignment
    AssignmentModule,
    // semester
    SemesterModule,
    // attempt
    BackupModule,
    SubmissionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
