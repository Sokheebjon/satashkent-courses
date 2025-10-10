import { Module } from '@nestjs/common';
import { DatabaseModule } from '@shared';
import { AuthModule } from 'shared/modules/auth';
import { CoursesService } from './courses.service';
import { CoursesRepository } from './courses.repository';
import { CoursesDocument, CoursesSchema } from './courses.schema';

@Module({
  imports: [
    AuthModule,
    DatabaseModule,
    DatabaseModule.forFeature([
      {
        name: CoursesDocument.name,
        schema: CoursesSchema,
      },
    ]),
  ],
  providers: [CoursesService, CoursesRepository],
  exports: [CoursesService, CoursesRepository],
})
export class SharedCoursesModule {}
