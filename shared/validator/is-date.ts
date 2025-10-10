import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';

export function IsDate(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'isDate',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: {
        ...validationOptions,
        message: `${propertyName} must be date`,
      },
      validator: {
        validate(value: any, args: ValidationArguments) {
          let newValue = value;
          if (value?.length == 23) {
            const divided = value.split('T');
            if (divided.length == 2) {
              newValue = divided[0] + 'T0' + divided[1];
            }
          }
          if (isNaN(Date.parse(newValue))) return false;
          args.object[propertyName] = new Date(newValue);
          return true;
        },
      },
    });
  };
}
