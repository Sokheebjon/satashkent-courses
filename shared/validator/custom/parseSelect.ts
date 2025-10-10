import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';
function parseSelect(select) {
  if (!select) return null;

  const fields = select.split(',');

  if (!fields.length) return null;

  const selectObj = {};

  fields.forEach((field) => {
    selectObj[field] = 1;
  });

  return selectObj;
}

export function ParseSelect(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'parseSelect',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: {
        ...validationOptions,
        message: `select must be valid`,
      },
      validator: {
        validate(value: any, args: ValidationArguments) {
          args.object[propertyName] = parseSelect(value);
          return true;
        },
      },
    });
  };
}
