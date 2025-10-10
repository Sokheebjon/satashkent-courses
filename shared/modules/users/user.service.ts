import { UserDocument } from './user.schema';
import { UserRepository } from './user.repository';
import { BaseError, BaseService, Collections, ErrorCode, PagingQueryDto } from '@shared';
import { CreateUserDto } from './dto/create-user.dto';
import { Injectable } from '@nestjs/common';
import { PasswordService } from '@shared/modules/auth/passwords/password.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { PipelineStage, SaveOptions } from 'mongoose';

@Injectable()
export class UserService extends BaseService<
  UserDocument,
  CreateUserDto,
  UpdateUserDto  
> {
  constructor(
    protected readonly repository: UserRepository,
    protected readonly passwordService: PasswordService,
  ) {
    super();
  }

  create = async (createUserDto: CreateUserDto, options?: SaveOptions) => {
    try {
      const user = await this.repository.create(createUserDto, options);
      if (createUserDto.password) {
        await this.passwordService.save(
          createUserDto.password,
          {
            userId: user._id,
          },
          options,
        );
      }
      return user;
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

  async paging(pagingQuery: PagingQueryDto) {
    const $lookupRole: PipelineStage.Lookup = {
      $lookup: {
        from: Collections.ROLES,
        localField: 'roleId',
        foreignField: '_id',
        pipeline: [
          {
            $project: {
              name: 1,
            },
          },
        ],
        as: 'role',
      },
    };
    const $unwindRole: PipelineStage.Unwind = {
      $unwind: {
        path: '$role',
        preserveNullAndEmptyArrays: true,
      },
    };

    const query: any = {};

    if (pagingQuery.search)
      query.name = {
        $regex: pagingQuery.search,
        $options: 'i',
      };

    const result = await this.repository.paging(query, pagingQuery, [
      $lookupRole,
      $unwindRole,
    ]);
    return result;
  }
}
