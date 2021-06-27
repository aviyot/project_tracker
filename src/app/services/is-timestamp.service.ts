import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class IsTimestampService {
  constructor() {}

  isTimestamp(value: any): boolean {
    return value instanceof Object && value.hasOwnProperty('seconds');
  }
}
