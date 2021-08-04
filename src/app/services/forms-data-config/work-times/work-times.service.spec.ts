/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { WorkTimesService } from './work-times.service';

describe('Service: WorkTimes', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WorkTimesService]
    });
  });

  it('should ...', inject([WorkTimesService], (service: WorkTimesService) => {
    expect(service).toBeTruthy();
  }));
});
