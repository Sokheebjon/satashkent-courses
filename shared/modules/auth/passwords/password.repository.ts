import { BaseRepository } from '@shared';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PasswordDocument } from './password.schema';

@Injectable()
export class PasswordRepository extends BaseRepository<PasswordDocument> {
  protected readonly logger = new Logger(PasswordDocument.name);

  constructor(
    @InjectModel(PasswordDocument.name) passwordModel: Model<PasswordDocument>,
  ) {
    super(passwordModel);
  }
}
