import {
  isMongoId,
  registerDecorator,
  ValidationOptions,
} from 'class-validator';
import { Types } from 'mongoose';

export function IsMongoIdCustom(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'isMongoIdCustom',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: {
        ...validationOptions,
        message: `${propertyName} must be mongodb id`,
      },
      validator: {
        validate(value: any) {
          // Handle arrays
          if (Array.isArray(value)) {
            return value.every((item) => {
              // Skip validation if already an ObjectId
              if (item instanceof Types.ObjectId) return true;
              // Handle null/undefined
              if (item == null) return false;
              // Check if string representation is valid
              return isMongoId(String(item));
            });
          }

          // Handle single value
          if (value instanceof Types.ObjectId) return true;
          if (value == null) return false;
          return isMongoId(String(value));
        },
      },
    });
  };
}
