export enum ErrorCode {
  Unknown = 1000,
  Validation = 1001,
  NotFound = 1002,
  Exist = 1003,
  PasswordWrong = 1004,
  InvalidFile = 1005,
  TooManyRequest = 1006,
  UserNotFound = 1010,
  UserExist = 1011,
  NotChecked = 1020,
  TimePassed = 1030,
  NoPermission = 1040,
  NoRightAnswer = 1050,
  AlreadyAnswered = 1060,
  NotInProcess = 1070,
  EmailCheckRequired = 1090,
  CodeExpired = 1091,
}

export enum ErrorLevel {
  WARNING = 'warning',
  ERROR = 'error',
}

export class BaseError {
  constructor(
    public code: number,
    public message?: string,
    public data?: any,
    public level: ErrorLevel = ErrorLevel.ERROR,
  ) {}

  public static Unknown(data?: any) {
    return new BaseError(ErrorCode.Unknown, 'Unknown error occurred', data);
  }

  public static Validation(data?: string) {
    return new BaseError(
      ErrorCode.Validation,
      data,
      'Validation error occured',
    );
  }

  public static TooManyRequest(data?: string) {
    return new BaseError(
      ErrorCode.TooManyRequest,
      data,
      'Too many requests were identified',
    );
  }

  public static NotFound(data?: string) {
    return new BaseError(ErrorCode.NotFound, 'Not Found', data);
  }

  public static Exist(data?: string) {
    return new BaseError(ErrorCode.Exist, 'Already exist', data);
  }

  public static PasswordWrong(data?: any) {
    return new BaseError(ErrorCode.PasswordWrong, 'Password is wrong', data);
  }

  public static UserNotFound(data?: any) {
    return new BaseError(ErrorCode.UserNotFound, 'User was not found', data);
  }

  public static UserExist(data?: any) {
    return new BaseError(ErrorCode.UserExist, 'User is already exist', data);
  }

  public static AdminNotFound(data?: any) {
    return new BaseError(ErrorCode.UserNotFound, 'Admin was not found', data);
  }

  public static AdminExist(data?: any) {
    return new BaseError(ErrorCode.UserExist, 'Admin is already exist', data);
  }

  public static InvalidFile(data?: any) {
    return new BaseError(ErrorCode.InvalidFile, 'Invalid File', data);
  }

  public static NotChecked(data?: any) {
    return new BaseError(
      ErrorCode.NotChecked,
      'Not checked yet',
      data,
      ErrorLevel.WARNING,
    );
  }

  public static TimePassed(data?: any) {
    return new BaseError(ErrorCode.TimePassed, 'Time has already passed', data);
  }

  public static NoPermission(data?: any) {
    return new BaseError(
      ErrorCode.NoPermission,
      "You don't have permission",
      data,
    );
  }

  public static NoRightAnswer(data?: any) {
    return new BaseError(
      ErrorCode.NoRightAnswer,
      'Not any right answers',
      data,
    );
  }

  public static AlreadyAnswered(data?: any) {
    return new BaseError(
      ErrorCode.AlreadyAnswered,
      'You have already answered it',
      data,
    );
  }

  public static NotInProcess(data?: any) {
    return new BaseError(ErrorCode.NotInProcess, 'It is not in process', data);
  }

  public static EmailCheckRequired(data?: any) {
    return new BaseError(
      ErrorCode.EmailCheckRequired,
      'Check email or try again later',
      data,
    );
  }

  public static CodeExpired(data?: any) {
    return new BaseError(ErrorCode.CodeExpired, 'Code expired', data);
  }
}
