import { CoursesDocument } from './courses.schema';
import { CoursesRepository } from './courses.repository';
import { BaseError, BaseService, ErrorCode } from '@shared';
import { CreateCourseDto } from './dto/create-course.dto';
import { Injectable } from '@nestjs/common';
import { UpdateCourseDto } from './dto/update-course.dto';
import { SaveOptions } from 'mongoose';

@Injectable()
export class CoursesService extends BaseService<
  CoursesDocument,
  CreateCourseDto,
  UpdateCourseDto
> {
  constructor(protected readonly repository: CoursesRepository) {
    super();
  }

  create = async (createCourseDto: CreateCourseDto, options?: SaveOptions) => {
    try {
      const course = await this.repository.create(createCourseDto, options);
      return course;
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
