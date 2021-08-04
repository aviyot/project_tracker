/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FormDataConfigService } from './form-data-config.service';

describe('Service: FormDataConfig', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FormDataConfigService]
    });
  });

  it('should ...', inject([FormDataConfigService], (service: FormDataConfigService) => {
    expect(service).toBeTruthy();
  }));
});
