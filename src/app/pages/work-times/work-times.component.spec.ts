import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkTimesComponent } from './work-times.component';

describe('WorkTimesComponent', () => {
  let component: WorkTimesComponent;
  let fixture: ComponentFixture<WorkTimesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkTimesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkTimesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
