import { BaseRepository } from '@shared';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LessonDocument } from './lessons.schema';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';

@Injectable()
export class LessonsRepository extends BaseRepository<
  LessonDocument,
  CreateLessonDto,
  UpdateLessonDto
> {
  protected readonly logger = new Logger(LessonsRepository.name);

  constructor(
    @InjectModel(LessonDocument.name) lessonModel: Model<LessonDocument>,
  ) {
    super(lessonModel);
  }
}
