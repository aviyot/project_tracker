import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WorkTime } from 'src/models/work-time.model';
import firebase from "firebase/app";
import "firebase/firestore";
import { AngularFirestoreDocument } from '@angular/fire/firestore';

@Component({
  selector: 'app-work-time-form',
  templateUrl: './work-time-form.component.html',
  styleUrls: ['./work-time-form.component.css']
})
export class WorkTimeFormComponent implements OnInit {
@Input('workTime') workTimeData :WorkTime | null;
@Input('docRef') docRef:AngularFirestoreDocument<firebase.firestore.DocumentData>;

workTime:FormGroup;
  constructor( private fb:FormBuilder) {

   }

  ngOnInit(): void {
    this.workTime = this.fb.group({
      startTime:[''],
      endTime:[''],
      task:['',Validators.required]
    })

    if(this.workTimeData){
      this.workTime.setValue(this.workTimeData);
    }
  }

  addWorkTime(){
    this.docRef.update({
      workTimes:firebase.firestore.FieldValue.arrayUnion(this.workTime.value)
    })

  }

  saveWorkTime(){
    this.docRef.update({
      workTimes:firebase.firestore.FieldValue.arrayRemove(this.workTimeData)
    }).then(()=>{
         this.addWorkTime();
    })

  }

}
