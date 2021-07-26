import { Component, Input, OnInit } from '@angular/core';
import { Challenge } from 'src/models/challenge.model';
import { Project } from 'src/models/project.model';
import { FormState } from 'src/models/ui/form-state';
import firebase from 'firebase/app';
import { AngularFirestoreDocument } from '@angular/fire/firestore';
import { FormAction } from 'src/types/form-action.type';

@Component({
  selector: 'app-challenges',
  templateUrl: './challenges.component.html',
  styleUrls: ['./challenges.component.css'],
})
export class ChallengesComponent implements OnInit {
  @Input() selectedProject: Project;
  @Input() docRef: AngularFirestoreDocument<firebase.firestore.DocumentData>;
  challengeState: FormState;

  constructor() {}

  ngOnInit(): void {
    this.challengeState = { add: false, edit: false, selectedIndex: null };
  }

  addChallenge() {
    this.challengeState.add = !this.challengeState.add;
  }
  editChallenge(index) {
    if (this.challengeState.selectedIndex !== index)
      this.challengeState.edit = true;
    else this.challengeState.edit = !this.challengeState.edit;
    this.challengeState.selectedIndex = index;
  }

  deleteChallenge(challenge: Challenge) {
    this.docRef.update({
      challenges: firebase.firestore.FieldValue.arrayRemove(challenge),
    });
  }

  onFormAction(formAction: FormAction) {
    if (formAction == 'ADD') {
      this.challengeState = { ...this.challengeState, add: false };
    }

    if (formAction == 'SAVE') {
      this.challengeState = {
        ...this.challengeState,
        edit: false,
      };
    }
  }
}
