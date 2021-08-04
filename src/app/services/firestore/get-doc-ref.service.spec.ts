/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GetDocRefService } from './get-doc-ref.service';

describe('Service: GetDocRef', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetDocRefService]
    });
  });

  it('should ...', inject([GetDocRefService], (service: GetDocRefService) => {
    expect(service).toBeTruthy();
  }));
});
