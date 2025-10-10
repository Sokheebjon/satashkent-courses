import { BaseRepository } from '@shared';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CategoryDocument } from './categories.schema';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesRepository extends BaseRepository<
  CategoryDocument,
  CreateCategoryDto,
  UpdateCategoryDto
> {
  protected readonly logger = new Logger(CategoriesRepository.name);

  constructor(
    @InjectModel(CategoryDocument.name) categoryModel: Model<CategoryDocument>,
  ) {
    super(categoryModel);
  }
}
