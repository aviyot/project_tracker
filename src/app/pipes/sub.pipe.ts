import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sub',
})
export class SubPipe implements PipeTransform {
  transform(value: string, split: string, pos?: number): string {
    if (value) {
      if (!pos) {
        pos = value.split(split).length - 1;
      }
      return value.split(split)[pos];
    } else {
      return '';
    }
  }
}
