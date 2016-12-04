import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pipeSimpleNumber',
  pure: false
})
export class SimpleNumberPipe implements PipeTransform {
  transform(value: number): string {
    let result: string = ""+value;
    return result.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
}