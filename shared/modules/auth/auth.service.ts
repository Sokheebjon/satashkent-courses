import { Types } from 'mongoose';
import { ConfigService } from '@nestjs/config';
import { PasswordService } from './passwords/password.service';
import { JwtService } from '@nestjs/jwt';
import { SessionService } from './session/session.service';
import { md5Util } from '@shared/utils';
import { Injectable } from '@nestjs/common';
import { BaseError, ErrorCode } from '@shared';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    protected readonly configService: ConfigService,
    protected readonly passwordService: PasswordService,
    protected readonly sessionService: SessionService,
  ) {}

  async authAdmin({
    adminId,
    password,
    params,
  }: {
    adminId: Types.ObjectId;
    password: string;
    params: any;
  }) {
    try {
      await this.passwordService.check(password, { adminId });

      const { _id: sessionId } = await this.sessionService.create(params);
      const tokenParam = {
        sessionId: sessionId,
        adminId,
      };

      const token = this.jwtService.sign(tokenParam);

      const hashToken = md5Util(token);
      await this.sessionService.updateById(sessionId, { hashToken });

      return token;
    } catch (error) {
      console.warn(error, 'error');
      throw new BaseError(ErrorCode.Unknown, 'Unknown', error);
    }
  }
}
