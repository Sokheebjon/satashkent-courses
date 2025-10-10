import { AdminDocument } from './admin.schema';
import { AdminRepository } from './admin.repository';
import { BaseError, BaseService, Collections, ErrorCode, PagingQueryDto } from '@shared';
import { CreateAdminDto } from './dto/create-admin.dto';
import { Injectable } from '@nestjs/common';
import { PasswordService } from '@shared/modules/auth/passwords/password.service';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { PipelineStage, SaveOptions } from 'mongoose';

@Injectable()
export class AdminService extends BaseService<
  AdminDocument,
  CreateAdminDto,
  UpdateAdminDto
> {
  constructor(
    protected readonly repository: AdminRepository,
    protected readonly passwordService: PasswordService,
  ) {
    super();
  }

  create = async (createAdminDto: CreateAdminDto, options?: SaveOptions) => {
    try {
      const admin = await this.repository.create(createAdminDto, options);
      if (createAdminDto.password) {
        await this.passwordService.save(
          createAdminDto.password,
          {
            adminId: admin._id,
          },
          options,
        );
      }
      return admin;
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
    console.log(pagingQuery, 'pagingQuery');
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
    console.log(result, 'result');
    return result;
  }
}
