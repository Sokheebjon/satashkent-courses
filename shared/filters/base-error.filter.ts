import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { BaseError, ErrorCode } from '../constants/error';

@Catch(BaseError)
export class BaseErrorFilter implements ExceptionFilter {
  catch(exception: BaseError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    // Map error codes to HTTP status codes
    const httpStatus = this.getHttpStatus(exception.code);

    response.status(httpStatus).json({
      statusCode: httpStatus,
      errorCode: exception.code,
      message: exception.message || 'An error occurred',
      data: exception.data,
      timestamp: new Date().toISOString(),
    });
  }

  private getHttpStatus(errorCode: number): HttpStatus {
    console.log(errorCode, "errorCode");
    switch (errorCode) {
      case ErrorCode.NotFound:
      case ErrorCode.UserNotFound:
        return HttpStatus.BAD_REQUEST;

      case ErrorCode.Validation:
        return HttpStatus.BAD_REQUEST;

      case ErrorCode.Exist:
      case ErrorCode.UserExist:
        return HttpStatus.CONFLICT;

      case ErrorCode.PasswordWrong:
        return HttpStatus.UNAUTHORIZED;

      case ErrorCode.InvalidFile:
        return HttpStatus.BAD_REQUEST;

      case ErrorCode.TooManyRequest:
        return HttpStatus.TOO_MANY_REQUESTS;

      case ErrorCode.NotChecked:
      case ErrorCode.TimePassed:
      case ErrorCode.AlreadyAnswered:
      case ErrorCode.NotInProcess:
      case ErrorCode.NoRightAnswer:
        return HttpStatus.BAD_REQUEST;

      case ErrorCode.NoPermission:
        return HttpStatus.FORBIDDEN;

      case ErrorCode.EmailCheckRequired:
      case ErrorCode.CodeExpired:
        return HttpStatus.BAD_REQUEST;

      case ErrorCode.Unknown:
      default:
        return HttpStatus.INTERNAL_SERVER_ERROR;
    }
  }
}
