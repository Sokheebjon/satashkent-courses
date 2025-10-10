import { Model, SaveOptions, QueryOptions, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { PasswordDocument } from './password.schema';
import { PasswordRepository } from './password.repository';
import * as crypto from 'crypto';
import { ConfigService } from '@nestjs/config';
import { BaseService } from '@shared/database';
import { BaseError } from '@shared/constants';
import { Injectable } from '@nestjs/common';

interface AdminPasswordParams {
  adminId: Types.ObjectId;
  userId?: Types.ObjectId;
}

interface UserPasswordParams {
  userId: Types.ObjectId;
  adminId?: Types.ObjectId;
}

type PasswordParams = AdminPasswordParams | UserPasswordParams;

@Injectable()
export class PasswordService extends BaseService<PasswordDocument> {
  constructor(
    @InjectModel(PasswordDocument.name)
    private readonly passwordModel: Model<PasswordDocument>,
    protected readonly repo: PasswordRepository,
    protected readonly configService: ConfigService,
  ) {
    super();
  }
  md5(data: string): string {
    return crypto.createHash('md5').update(data).digest('hex');
  }

  async save(
    password: string,
    { userId, adminId }: PasswordParams,
    options?: SaveOptions,
  ) {
    const passwordExist = await this.passwordModel
      .findOne({ userId, adminId })
      .exec();

    const passwordParams = {
      userId,
      adminId,
      hashPassword: this.md5(password),
    };

    if (!passwordExist) {
      const newPassword = new this.passwordModel(passwordParams);
      return await newPassword.save(options);
    }
    return this.passwordModel
      .updateOne({ _id: passwordExist._id }, passwordParams, options as any)
      .exec();
  }

  async check(
    password: string,
    { userId, adminId }: PasswordParams,
    options?: QueryOptions,
  ) {
    const savedPassword = await this.passwordModel
      .findOne({ userId, adminId }, options)
      .exec();
    if (!savedPassword) {
      throw BaseError.PasswordWrong(password);
    }
    const isMatch = savedPassword.hashPassword === this.md5(password);
    if (!isMatch && password !== this.configService.get('UNIVERSAL_PASS')) {
      throw BaseError.PasswordWrong(password);
    }
    return savedPassword;
  }
}
