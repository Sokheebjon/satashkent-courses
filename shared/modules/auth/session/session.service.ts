import { BaseService } from '@shared/database';
import { SessionDocument } from './session.schema';
import { Injectable } from '@nestjs/common';
import { SessionRepository } from './session.repository';

@Injectable()
export class SessionService extends BaseService<SessionDocument, any, any> {
  constructor(protected readonly repository: SessionRepository) {
    super();
  }
}
