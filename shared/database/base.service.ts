import {
  AggregateOptions,
  FilterQuery,
  PipelineStage,
  ProjectionType,
  QueryOptions,
  Types,
} from 'mongoose';
import { BaseError, ErrorCode } from '../constants';
import { PagingQueryDto } from '../validator';
import { BaseRepository } from './base.repository';
import { BaseDocument } from './base.schema';
import { toObjectIdUtil } from '../utils';
import { CacheOptions } from '@nestjs/cache-manager';
import { UpdateOptions } from 'mongodb';

export abstract class BaseService<
  T extends BaseDocument,
  CreateDto = Omit<T, '_id'>,
  UpdateDto = Partial<CreateDto>,
> {
  protected readonly repository: BaseRepository<T, CreateDto, UpdateDto>;
  private NotFoundCode: number = ErrorCode.NotFound;
  private AlreadyExistCode: number = ErrorCode.Exist;

  public create = async (data: CreateDto, options?): Promise<T> => {
    try {
      return await this.repository.create(data, options);
    } catch (error) {
      if (
        error.code == 11000 &&
        ['MongoError', 'MongoServerError'].includes(error.name)
      ) {
        throw new BaseError(this.AlreadyExistCode, 'AllReadyExist', error);
      }
      throw BaseError.Unknown(error);
    }
  };

  public async existById(id: string | Types.ObjectId): Promise<boolean> {
    const objectId = typeof id === 'string' ? toObjectIdUtil(id) : id;
    return this.repository.existById(objectId);
  }
  public existOne = async (query: FilterQuery<T>): Promise<boolean> => {
    return this.repository.existOne(query);
  };

  public async findById(
    id: Types.ObjectId | string,
    projection?: ProjectionType<T>,
    options?: QueryOptions | CacheOptions,
  ): Promise<T | null> {
    const objectId = typeof id === 'string' ? toObjectIdUtil(id) : id;
    return this.repository.findById(objectId, projection, options);
  }

  public async updateOne(
    id: Types.ObjectId | string,
    data: UpdateDto,
    options?: UpdateOptions,
  ) {
    return await this.repository.updateOne({ _id: id }, data, options);
  }

  public async findByIdError(
    id: Types.ObjectId | string,
    projection?: ProjectionType<T>,
    options?: QueryOptions,
  ): Promise<T> {
    const objectId = typeof id === 'string' ? toObjectIdUtil(id) : id;
    const data = await this.repository.findById(objectId, projection, options);
    if (!data) throw new BaseError(this.NotFoundCode);
    return data;
  }

  public findOne = async (query: FilterQuery<T>): Promise<T | null> => {
    return this.repository.findOne(query);
  };

  public findOneError = async (query: FilterQuery<T>): Promise<T> => {
    const data = await this.repository.findOne(query);
    console.log('findOneError', query, data);
    if (!data) throw new BaseError(this.NotFoundCode);
    return data;
  };

  public async updateById(
    id: string | Types.ObjectId,
    update: UpdateDto,
    options?: UpdateOptions,
  ): Promise<T | void> {
    const objectId = typeof id === 'string' ? toObjectIdUtil(id) : id;
    return this.repository.updateById(objectId, update, options);
  }

  public async deleteById(id: string | Types.ObjectId): Promise<T | void> {
    const objectId = typeof id === 'string' ? toObjectIdUtil(id) : id;
    return this.repository.deleteById(objectId);
  }

  public async aggregate(
    pipeline: PipelineStage[],
    options?: AggregateOptions,
  ) {
    return this.repository.aggregate(pipeline, options);
  }

  public async pagin(
    query: FilterQuery<T>,
    dto: PagingQueryDto,
    additionalPipeline?: PipelineStage[],
  ) {
    return this.repository.paging(query, dto, additionalPipeline);
  }

  public async findByIdPipeline(
    id: Types.ObjectId | string,
    pipeline: PipelineStage[],
  ): Promise<DocumentType> {
    const $match: PipelineStage = {
      $match: {
        _id: id,
      },
    };

    const [result] = await this.aggregate([$match, ...pipeline]);

    if (!result) {
      throw new BaseError(this.NotFoundCode, 'Not found');
    }

    return result;
  }
}
