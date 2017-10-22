import {AbstractControl, ValidatorFn} from '@angular/forms';
import {isNullOrUndefined} from "util";

export function dateInFutureValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    const value = control.value;
    if (value && value.jsdate < new Date()) {
      return {'futureDate': ['Дата истекла!']};
    }
    return null;
  };
}

export function dateInPastValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    const value = control.value;
    if (value && value.jsdate > new Date()) {
      return {'pastDate': ['Дата не корректна!']};
    }
    return null;
  };
}
