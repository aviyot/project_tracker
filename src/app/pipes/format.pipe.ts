import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { IsTimestampService } from '../services/is-timestamp.service';

@Pipe({
  name: 'format',
})
export class FormatPipe implements PipeTransform {
  constructor(
    private timestampServ: IsTimestampService,
    private datePipe: DatePipe
  ) {}
  transform(value: any) {
    if (value) {
      if (this.timestampServ.isTimestamp(value)) {
        return this.datePipe.transform(value.toDate(), 'yyyy-MM-dd');
      } else if (typeof value == 'string' && value.length) {
        return this.datePipe.transform(new Date(value as string), 'yyyy-MM-dd');
      } else return null;
    } else return null;
  }
}
