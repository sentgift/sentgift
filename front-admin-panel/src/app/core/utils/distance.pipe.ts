import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'distance'
})
export class DistancePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (Number(value)) {
      const numberValue = Number(value);
      const kilometers = Math.floor(numberValue);
      const meters = (value * 1000) % 1000;
      let result = '';
      if (kilometers > 0) {
        result += kilometers.toFixed(0) + ' км ';
      }
      if (meters > 0) {
        result += meters.toFixed() + ' м ';
      }
      return result;
    }
    return NaN;
  }

}
