import { BaseRepository } from '@shared';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SessionDocument } from './session.schema';

@Injectable()
export class SessionRepository extends BaseRepository<SessionDocument> {
  protected readonly logger = new Logger(SessionDocument.name);

  constructor(
    @InjectModel(SessionDocument.name) sessionModel: Model<SessionDocument>,
  ) {
    super(sessionModel);
  }
}
