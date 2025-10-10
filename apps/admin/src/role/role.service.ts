import { BaseError, ErrorCode, PagingQueryDto, BaseService } from '@shared';
import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RoleRepository } from './role.repository';
import { RoleDocument } from './role.schema';

@Injectable()
export class RoleService extends BaseService<
  RoleDocument,
  CreateRoleDto,
  UpdateRoleDto
> {
  constructor(protected readonly repository: RoleRepository) {
    super();
  }

  create = async (createRoleDto: CreateRoleDto) => {
    try {
      const role = await this.repository.create(createRoleDto);

      return role;
    } catch (error) {
      if (
        error.code == 11000 &&
        ['MongoError', 'MongoServerError'].includes(error.name)
      ) {
        throw new BaseError(ErrorCode.Exist, 'AllReadyExist', error);
      }

      console.warn(error, 'error');
      throw BaseError.Unknown(error);
    }
  };

  async paging(pagingQuery: PagingQueryDto) {
    const query: any = {};

    if (pagingQuery.search) {
      query.name = {
        $regex: pagingQuery.search,
        $options: 'i',
      };
    }

    const result = await this.repository.paging(query, pagingQuery);
    return result;
  }
}
