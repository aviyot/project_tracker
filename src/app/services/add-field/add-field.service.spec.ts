import { TestBed } from '@angular/core/testing';

import { AddFieldService } from './add-field.service';

describe('AddFieldService', () => {
  let service: AddFieldService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddFieldService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
