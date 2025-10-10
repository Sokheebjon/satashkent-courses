import { Module } from '@nestjs/common';
import { DatabaseModule } from '@shared';
import { AuthModule } from 'shared/modules/auth';
import { LessonsService } from './lessons.service';
import { LessonsRepository } from './lessons.repository';
import { LessonDocument, LessonSchema } from './lessons.schema';

@Module({
  imports: [
    AuthModule,
    DatabaseModule,
    DatabaseModule.forFeature([
      {
        name: LessonDocument.name,
        schema: LessonSchema,
      },
    ]),
  ],
  providers: [LessonsService, LessonsRepository],
  exports: [LessonsService, LessonsRepository],
})
export class SharedLessonsModule {}
