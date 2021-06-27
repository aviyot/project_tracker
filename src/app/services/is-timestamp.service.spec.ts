import { TestBed } from '@angular/core/testing';

import { IsTimestampService } from './is-timestamp.service';

describe('IsTimestampService', () => {
  let service: IsTimestampService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IsTimestampService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
