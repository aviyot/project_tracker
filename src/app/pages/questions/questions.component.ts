import { Component, Input, OnInit } from '@angular/core';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { Project } from 'src/models/project.model';
import { QuestionAnswer } from 'src/models/question-answer.model';
import { FormState } from 'src/models/ui/form-state';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {
  @Input() selectedProject: Project;
  @Input() docRef;
  qaState:FormState;
  constructor() { }

  ngOnInit(): void {
    this.qaState = { add: false, edit: false, selectedIndex: null };

  }

  
  addQA() {
    this.qaState.add = !this.qaState.add;
  }
  editQA(index: number) {
    if (this.qaState.selectedIndex !== index) this.qaState.edit = true;
    else this.qaState.edit = !this.qaState.edit;
    this.qaState.selectedIndex = index;
  }

  deleteQA(qa: QuestionAnswer) {
    this.docRef.update({
      questions: firebase.firestore.FieldValue.arrayRemove(qa),
    });
  }

}
