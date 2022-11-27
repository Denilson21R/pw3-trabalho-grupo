import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tempoPreparo'
})
export class TempoPreparoPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    //TODO: example "2 horas e 34 minutos"
    return value;
  }

}
