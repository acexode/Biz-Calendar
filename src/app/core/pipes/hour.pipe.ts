import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hour'
})
export class HourPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
    const date = new Date(value);
    const min = date.getMinutes();
    const hr = date.getHours();
    if(min > 0){
      return '';
    }else{
      return hr+':00';
    }

  }

}
