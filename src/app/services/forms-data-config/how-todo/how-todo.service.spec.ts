/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { HowTodoService } from './how-todo.service';

describe('Service: HowTodo', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HowTodoService],
    });
  });

  it('should ...', inject([HowTodoService], (service: HowTodoService) => {
    expect(service).toBeTruthy();
  }));
});
