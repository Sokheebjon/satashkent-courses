import { CategoryDocument } from './categories.schema';
import { CategoriesRepository } from './categories.repository';
import { BaseError, BaseService, ErrorCode } from '@shared';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Injectable } from '@nestjs/common';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { SaveOptions } from 'mongoose';

@Injectable()
export class CategoriesService extends BaseService<
  CategoryDocument,
  CreateCategoryDto,
  UpdateCategoryDto
> {
  constructor(protected readonly repository: CategoriesRepository) {
    super();
  }

  create = async (createCategoryDto: CreateCategoryDto, options?: SaveOptions) => {
    try {
      const category = await this.repository.create(createCategoryDto, options);
      return category;
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
