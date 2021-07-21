import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectDescFormComponent } from './project-desc-form.component';

describe('ProjectDescFormComponent', () => {
  let component: ProjectDescFormComponent;
  let fixture: ComponentFixture<ProjectDescFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectDescFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectDescFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
