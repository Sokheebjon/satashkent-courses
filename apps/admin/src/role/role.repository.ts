import { BaseRepository } from '@shared';
import { Injectable, Logger } from '@nestjs/common';
import { RoleDocument } from './role.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Injectable()
export class RoleRepository extends BaseRepository<
  RoleDocument,
  CreateRoleDto,
  UpdateRoleDto
> {
  protected readonly logger = new Logger(RoleRepository.name);

  constructor(@InjectModel(RoleDocument.name) roleModel: Model<RoleDocument>) {
    super(roleModel);
  }
}
