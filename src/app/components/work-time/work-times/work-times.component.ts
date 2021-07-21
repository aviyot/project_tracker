import { Component, Input, OnInit } from '@angular/core';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { Project } from 'src/models/project.model';
import { FormState } from 'src/models/ui/form-state';
import { WorkTime } from 'src/models/work-time.model';


@Component({
  selector: 'app-work-times',
  templateUrl: './work-times.component.html',
  styleUrls: ['./work-times.component.css']
})
export class WorkTimesComponent implements OnInit {
  @Input() selectedProject: Project;
  @Input() docRef;
  workTimeState: FormState;
  constructor() { }

  ngOnInit(): void {
    this.workTimeState = { add: false, edit: true, selectedIndex: null };

  }

  addWorkTime() {
    this.workTimeState.add = !this.workTimeState.add;
  }

  editWorkTime(index: number) {
    if (this.workTimeState.selectedIndex !== index)
      this.workTimeState.edit = true;
    else this.workTimeState.edit = !this.workTimeState.edit;
    this.workTimeState.selectedIndex = index;
  }

  deleteWorkTime(workTime: WorkTime) {
    this.docRef.update({
      workTimes: firebase.firestore.FieldValue.arrayRemove(workTime),
    });
  }

}
