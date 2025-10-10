import { BaseRepository } from '@shared';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CoursesDocument } from './courses.schema';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Injectable()
export class CoursesRepository extends BaseRepository<
  CoursesDocument,
  CreateCourseDto,
  UpdateCourseDto
> {
  protected readonly logger = new Logger(CoursesRepository.name);

  constructor(
    @InjectModel(CoursesDocument.name) coursesModel: Model<CoursesDocument>,
  ) {
    super(coursesModel);
  }
}
