import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tempoPreparo'
})
export class TempoPreparoPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return value;
  }

}
