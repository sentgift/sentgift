import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toArray'
})
export class ToArrayPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value) {
      return [value];
    } else {
      return undefined;
    }
  }

}
