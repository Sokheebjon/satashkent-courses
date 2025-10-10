import { Injectable } from '@nestjs/common';
import { Connection, ClientSession } from 'mongoose';
import { InjectConnection } from '@nestjs/mongoose';
import { BaseError } from '@shared';

@Injectable()
export class TransactionService {
  constructor(@InjectConnection() private readonly connection: Connection) {}

  async execute<T>(
    callback: (session: ClientSession) => Promise<T>,
  ): Promise<T> {
    const session = await this.connection.startSession();
    let resultSuccess: T;
    let resultError: any;

    try {
      session.startTransaction();
      resultSuccess = await callback(session);
      await session.commitTransaction();
    } catch (error) {
      console.warn('Transaction Error:', error);
      await session.abortTransaction();

      resultError =
        error instanceof BaseError ? error : BaseError.Unknown(error);
    } finally {
      await session.endSession();
    }

    if (resultError) {
      throw resultError;
    }
    return resultSuccess!;
  }
}
