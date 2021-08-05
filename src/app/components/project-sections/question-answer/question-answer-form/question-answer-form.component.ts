import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestoreDocument } from '@angular/fire/firestore';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

import firebase from 'firebase/app';
import 'firebase/firestore';
import { QuestionAnswer } from 'src/models/question-answer.model';

@Component({
  selector: 'app-question-answer-form',
  templateUrl: './question-answer-form.component.html',
  styleUrls: ['./question-answer-form.component.css'],
})
export class QuestionAnswerFormComponent implements OnInit {
  @Input('question') questionData: QuestionAnswer | null;
  @Input('docRef')
  docRef: AngularFirestoreDocument<firebase.firestore.DocumentData>;
  question: FormGroup;
  answerLink: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.question = this.fb.group({
      question: [''],
      questionTime: [''],
      lifecycleStageId: [''],
      featureId: [''],
      answered: [''],
      answer: [''],
      answerTime: [''],
      answerLinks: this.fb.array([]),
    });
    this.answerLink = this.fb.group({
      from: [''],
      link: [''],
      prefer: [''],
    });
    if (this.questionData) {
      this.questionData.answerLinks.forEach((element) => {
        (this.question.get('answerLinks') as FormArray).push(this.answerLink);
      });
      this.question.setValue(this.questionData);
    }
  }

  getAnswerLinks(): FormArray {
    return this.question.get('answerLinks') as FormArray;
  }

  addAnswerLink(data?: any[]) {
    const answerLinkRef = this.getAnswerLinks();
    const answerLink = this.fb.group({
      from: [''],
      link: [''],
      prefer: [''],
    });

    if (data) {
      data.forEach((dataItem) => {
        answerLinkRef.push(
          this.fb.group({
            from: [dataItem.from],
            link: [dataItem.link],
            prefer: [dataItem.prefer],
          })
        );
      });
    } else {
      answerLinkRef.push(answerLink);
    }
  }

  addQA() {
    this.docRef
      .update({
        questions: firebase.firestore.FieldValue.arrayUnion(
          this.question.value
        ),
      })
      .then(() => {
        this.question.reset();
      });
  }

  saveQA() {
    this.docRef
      .update({
        questions: firebase.firestore.FieldValue.arrayRemove(this.questionData),
      })
      .then(() => {
        this.addQA();
      });
  }
}
