import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionAnswerFormComponent } from './question-answer-form.component';

describe('QuestionAnswerFormComponent', () => {
  let component: QuestionAnswerFormComponent;
  let fixture: ComponentFixture<QuestionAnswerFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionAnswerFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionAnswerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
