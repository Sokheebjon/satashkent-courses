import {
  AggregateOptions,
  FilterQuery,
  Model,
  MongooseBulkWriteOptions,
  PipelineStage,
  ProjectionType,
  QueryOptions,
  SaveOptions,
  Types,
  UpdateQuery,
  UpdateWithAggregationPipeline,
} from 'mongoose';
import { BaseDocument } from './base.schema';
import { UpdateOptions } from 'mongodb';
import { PagingQueryDto } from '../validator';
import { BaseError } from '@shared/constants';

export abstract class BaseRepository<
  TDocument extends BaseDocument,
  CreateDto = Omit<TDocument, '_id'>,
  UpdateDto = Partial<CreateDto>,
> {
  constructor(protected readonly model: Model<TDocument>) {}

  public async aggregate(
    pipeline: PipelineStage[],
    options?: AggregateOptions,
  ) {
    const $match = {
      $match: {
        deletedAt: null,
      },
    };
    const madePipeline = [$match, ...pipeline];
    return this.model.aggregate(madePipeline, options);
  }

  public async count(query: FilterQuery<TDocument>): Promise<number> {
    return this.model.countDocuments(query);
  }

  public async create(
    document: CreateDto,
    options?: SaveOptions,
  ): Promise<TDocument> {
    const createdDocument = new this.model({
      ...document,
      _id: new Types.ObjectId(),
    });
    return (await createdDocument.save(options)).toJSON() as TDocument;
  }

  public async createMany(
    documents: any,
    options?: SaveOptions,
  ): Promise<TDocument[]> {
    const createdDocuments = documents.map((document) => ({
      ...document,
      _id: new Types.ObjectId(),
    }));
    return (await this.model.insertMany(createdDocuments, options as SaveOptions)).map((doc) =>
      doc.toJSON(),
    ) as TDocument[];
  }

  public async existById(id: Types.ObjectId): Promise<boolean> {
    const result = await this.model.exists({ _id: id });
    return Boolean(result);
  }

  public async existOne(query: FilterQuery<TDocument>): Promise<boolean> {
    const result = await this.model.exists(query);
    return Boolean(result);
  }

  public async deleteById(
    id: Types.ObjectId,
    options?: UpdateOptions,
  ): Promise<void> {
    await this.model.deleteOne({ _id: id }, options);
  }

  public async findById(
    id: Types.ObjectId,
    projection?: ProjectionType<TDocument>,
    options?: QueryOptions,
  ): Promise<TDocument | null> {
    return this.model.findById(id, projection, options);
  }

  public async findByIdError(
    id: Types.ObjectId | string,
    projection?: ProjectionType<TDocument>,
    options?: QueryOptions,
  ) {
    const result = this.model.findById(id, projection, options);
    if (!result) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      throw new BaseError.NotFound();
    }
    return result;
  }

  public async findOne(
    query: FilterQuery<TDocument>,
    projection?: ProjectionType<TDocument>,
    options?: QueryOptions,
  ): Promise<TDocument | null> {
    return this.model.findOne(query, projection, options);
  }

  public findMany = async (
    query: FilterQuery<TDocument>,
    projection?: ProjectionType<TDocument>,
    options?: QueryOptions,
  ) => this.model.find(query, projection, options);

  public async updateById(
    id: Types.ObjectId,
    data: UpdateDto | UpdateQuery<TDocument> | UpdateWithAggregationPipeline,
    options?: UpdateOptions,
  ): Promise<void> {
    await this.model.updateOne({ _id: id }, data as UpdateQuery<TDocument>, options);
  }

  public async updateOne(
    query: FilterQuery<TDocument>,
    data: UpdateDto | UpdateQuery<TDocument> | UpdateWithAggregationPipeline,
    options?: UpdateOptions,
  ): Promise<void> {
    await this.model.updateOne(query, data as UpdateQuery<TDocument>, options);
  }

  public async paging(
    query: FilterQuery<TDocument>,
    dto: PagingQueryDto,
    additionalPipeline?: PipelineStage[],
  ) {
    const newQuery = {
      ...query,
    };
    newQuery.deletedAt = null;

    delete newQuery.page;
    delete newQuery.limit;
    delete newQuery.search;
    delete newQuery.sortBy;
    delete newQuery.sortOrder;

    const $match = {
      $match: newQuery,
    };
    const $sort: PipelineStage.Sort = {
      $sort: {},
    };
    $sort.$sort[dto.sortBy] = dto.sortOrder;
    if (dto.sortBy != '_id') {
      $sort.$sort['_id'] = 1;
    }

    const $skip = {
      $skip: dto.limit * (dto.page - 1),
    };
    const $limit = {
      $limit: dto.limit,
    };
    const pipeline: PipelineStage[] = [
      $match,
      ...(additionalPipeline?.length ? additionalPipeline : []),
      $sort,
      $skip,
      $limit,
    ];
    const total = await this.count(newQuery);
    const data = await this.aggregate(pipeline);
    return {
      total,
      data,
    };
  }

  public async bulkWrite(data: any, options?: MongooseBulkWriteOptions) {
    await this.model.bulkWrite(data, options);
  }

  public async deleteMany(query: FilterQuery<TDocument>): Promise<void> {
    await this.model.deleteMany(query);
  }

  public async updateMany(
    query: FilterQuery<TDocument>,
    data: UpdateDto | UpdateQuery<TDocument> | UpdateWithAggregationPipeline,
    options?: UpdateOptions,
  ): Promise<void> {
    await this.model.updateMany(query, data as UpdateQuery<TDocument>, options);
  }
}
