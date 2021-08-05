import { omit } from 'lodash';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BizInputsService {
  constructor() { }

  addInvalidInputError(currentError: any) {
    if (currentError instanceof Object) {
      return {
        ...currentError,
        ...{
          // eslint-disable-next-line @typescript-eslint/naming-convention
          INVALID_INPUT: true,
        },
      };
    } else {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      return { INVALID_INPUT: true };
    }
  }

  clearInvalidInputError(error: any) {
    if (error instanceof Object) {
      const newErr = omit(error, ['INVALID_INPUT']);
      if (Object.keys(newErr).length) {
        return newErr;
      }
    }
    return null;
  }
}
