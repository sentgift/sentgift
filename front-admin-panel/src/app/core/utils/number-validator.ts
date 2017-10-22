import {AbstractControl, ValidatorFn} from '@angular/forms';
import {isNullOrUndefined} from "util";

export function floatNumberValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
      const value = control.value;
    if (!isNullOrUndefined(value) && value != '') {
      const numberValue = Number.parseFloat(value);
      if (Number.isNaN(numberValue)) {
        return {'floatNumber': ['Поле должно являтся дробным числом!']};
      } else {
        return null;
      }
    }
    return null;
  };
}

export function integerNumberValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    const value = control.value;
    if (!isNullOrUndefined(value) && value != '') {
      const numberValue = Number.parseFloat(value);
      if (Number.isInteger(numberValue)) {
        return null;
      } else {
        return {'integerNumber': ['Поле должно являтся целым числом!']};
      }
    }
    return null;
  };
}

