/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ProjectSitesService } from './project-sites.service';

describe('Service: ProjectSites', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProjectSitesService]
    });
  });

  it('should ...', inject([ProjectSitesService], (service: ProjectSitesService) => {
    expect(service).toBeTruthy();
  }));
});
