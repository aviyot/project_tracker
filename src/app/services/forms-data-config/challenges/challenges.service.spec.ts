/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ChallengesService } from './challenges.service';

describe('Service: Challenges', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChallengesService]
    });
  });

  it('should ...', inject([ChallengesService], (service: ChallengesService) => {
    expect(service).toBeTruthy();
  }));
});
