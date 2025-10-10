import { BaseRepository } from '@shared';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AdminDocument } from './admin.schema';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';

@Injectable()
export class AdminRepository extends BaseRepository<
  AdminDocument,
  CreateAdminDto,
  UpdateAdminDto
> {
  protected readonly logger = new Logger(AdminRepository.name);

  constructor(
    @InjectModel(AdminDocument.name) adminModel: Model<AdminDocument>,
  ) {
    super(adminModel);
  }
}
