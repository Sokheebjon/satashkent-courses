import { LessonDocument } from './lessons.schema';
import { LessonsRepository } from './lessons.repository';
import { BaseError, BaseService, ErrorCode } from '@shared';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { Injectable } from '@nestjs/common';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { SaveOptions } from 'mongoose';

@Injectable()
export class LessonsService extends BaseService<
  LessonDocument,
  CreateLessonDto,
  UpdateLessonDto
> {
  constructor(protected readonly repository: LessonsRepository) {
    super();
  }

  create = async (createLessonDto: CreateLessonDto, options?: SaveOptions) => {
    try {
      const lesson = await this.repository.create(createLessonDto, options);
      return lesson;
    } catch (error) {
      if (
        error.code == 11000 &&
        ['MongoError', 'MongoServerError'].includes(error.name)
      ) {
        throw new BaseError(ErrorCode.Exist, 'AllReadyExist', error);
      }
      throw BaseError.Unknown(error);
    }
  };
}
