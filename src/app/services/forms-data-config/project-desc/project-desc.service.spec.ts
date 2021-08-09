/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ProjectDescService } from './project-desc.service';

describe('Service: ProjectDesc', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProjectDescService]
    });
  });

  it('should ...', inject([ProjectDescService], (service: ProjectDescService) => {
    expect(service).toBeTruthy();
  }));
});
