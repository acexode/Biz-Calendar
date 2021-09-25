import { AbstractControlDirective, AbstractControl } from '@angular/forms';

const genKey = 'genericError';
const errorMessages = {
    required: () => 'Required field',
    minlength: (params) =>
      'The minimum number of characters is ' + params.requiredLength,
    maxlength: (params) =>
      'The maximum number of characters is ' + params.requiredLength,
    email: (params) => 'Invalid email value.',
    equalTo: (params) => 'The words do not match.',
    pattern: (pattern) => handlePattern(pattern),
    genericError: (params) => 'Password doesn\'t match.',
    lowercaseCharacterRule: (params) =>
      'The minimum number of lowercase letters is ' + params.required,
    digitCharacterRule: (params) =>
      'The minimum number of digits is ' + params.required,
    uppercaseCharacterRule: (params) =>
      'The minimum number of capital letters is ' + params.required,
    specialCharacterRule: (params) =>
      'The minimum number of special characters is ' + params.required,
  };


export const shouldShowErrors = (
  control: AbstractControlDirective | AbstractControl
): boolean => (
      control &&
      control.errors &&
      (control.dirty || control.touched)
    );

export const listOfErrors = (
  control: AbstractControlDirective | AbstractControl
): any => {
  if (shouldShowErrors(control)) {
     return Object.keys(control.errors).map((field) =>
    getMessage(field, control.errors[field])
  );
  }

};

  const getMessage = (type: string, params: any) => errorMessages[type]
      ? errorMessages[type](params)
      : errorMessages[genKey](params);


 const handlePattern = (pattern: any) => {
    const rP =
      pattern && pattern.hasOwnProperty('requiredPattern')
        ? RegExp(pattern.requiredPattern).source.toString()
        : null;

    const strongPass = RegExp(
      '^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})'
    ).source.toString();

    switch (rP) {
      case strongPass:
        return 'Accepted values: 0-9';
      default:
        return 'Field value error';
    }
  };
