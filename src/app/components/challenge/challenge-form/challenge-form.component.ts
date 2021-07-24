import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestoreDocument } from '@angular/fire/firestore';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Challenge } from 'src/models/challenge.model';
import firebase from 'firebase/app';

@Component({
  selector: 'app-challenge-form',
  templateUrl: './challenge-form.component.html',
  styleUrls: ['./challenge-form.component.css'],
})
export class ChallengeFormComponent implements OnInit {
  challenge: FormGroup;
  constructor(private fb: FormBuilder) {}
  @Input('challenge') challengeData: Challenge;
  @Input() docRef: AngularFirestoreDocument<firebase.firestore.DocumentData>;
  ngOnInit(): void {
    this.challenge = this.fb.group({
      title: [''],
      challenge: [''],
      solution: [''],
    });

    if (this.challengeData) {
      this.challenge.patchValue(this.challengeData);
    }
  }

  addChallenge() {
    this.docRef.update({
      challenges: firebase.firestore.FieldValue.arrayUnion(
        this.challenge.value
      ),
    });
  }

  saveChallenge() {
    this.docRef
      .update({
        challenges: firebase.firestore.FieldValue.arrayRemove(
          this.challengeData
        ),
      })
      .then(() => {
        this.docRef.update({
          challenges: firebase.firestore.FieldValue.arrayUnion(
            this.challenge.value
          ),
        });
      });
  }
}