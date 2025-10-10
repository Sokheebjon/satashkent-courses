import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';

function parseValue(value) {
  if (value.toLowerCase() === 'true' || value.toLowerCase() === 'false') {
    return value.toLowerCase() === 'true';
  }

  // if (!isNaN(value) && !isNaN(parseFloat(value))) {
  //   return Number(value);
  // }

  const regex =
    /^\d{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12]\d|3[01])T(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d\.\d{3}Z$/;

  if (regex.test(value)) {
    return new Date(value);
  }

  return value;
}

function parseFilter(filter) {
  if (!filter) return null;

  const filterObj = {};
  Object.keys(filter).forEach((k) => {
    const value = filter[k];
    const keys = k.split('.');
    if (keys.length < 2) return;
    const key = keys[0];
    if (key !== 'filter') return;

    let tempObj = filterObj;
    keys.shift();

    keys.forEach((k, i) => {
      if (i === keys.length - 1) {
        tempObj[k] = parseValue(value);
      } else {
        tempObj[k] = tempObj[k] || {};
        tempObj = tempObj[k];
      }
    });
  });

  if (Object.keys(filterObj).length === 0) return null;

  return filterObj;
}

export function ParseFilter(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'parseFilter',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: {
        ...validationOptions,
        message: `filter must be valid`,
      },
      validator: {
        validate(_value: any, args: ValidationArguments) {
          args.object['filter'] = parseFilter(args.object);
          return true;
        },
      },
    });
  };
}
