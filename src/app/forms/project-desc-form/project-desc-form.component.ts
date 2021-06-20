import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import { AngularFirestoreDocument } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectData } from 'src/models/project-data.model';
import firebase from 'firebase/app';
import 'firebase/firestore';

@Component({
  selector: 'app-project-desc-form',
  templateUrl: './project-desc-form.component.html',
  styleUrls: ['./project-desc-form.component.css'],
})
export class ProjectDescFormComponent implements OnInit, OnChanges {
  projectDesc: FormGroup;
  @Input('project') projectData: ProjectData;
  @Input('docRef')
  docRef: AngularFirestoreDocument<firebase.firestore.DocumentData>;
  @Input('added') added = false;
  @Output('newProject') newProject = new EventEmitter<ProjectData>();

  projectForm: FormGroup;
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.projectDesc = this.fb.group({
      name: ['', Validators.required],
      desc: [''],
      startTime: [''],
      endTime: [''],
      lifecycleStage: [''],
      gitHub: [''],
      site: [''],
    });

    if (this.projectData) {
      this.projectDesc.setValue({
        name: this.projectData.name,
        desc: this.projectData.desc,
        startTime: this.projectData.startTime,
        endTime: this.projectData.endTime,
        lifecycleStage: this.projectData.lifecycleStage,
        gitHub: this.projectData.gitHub,
        site: this.projectData.startTime,
      });
    } else {
      this.createNewProject();
      this.projectDesc.valueChanges.subscribe((value) => {
        this.projectForm.patchValue(value);
        this.newProject.emit(this.projectForm.value);
      });
    }
  }

  ngOnChanges() {
    if (this.added) {
      this.projectDesc.reset();
    }
  }
  createNewProject() {
    this.projectForm = this.fb.group({
      name: ['', [Validators.required]],
      desc: [''],
      startTime: [''],
      endTime: [''],
      lifecycleStage: [''],
      gitHub: [''],
      site: [''],
      tools: this.fb.array([]),
      todos: this.fb.array([]),
      features: this.fb.array([]),
      questions: this.fb.array([]),
      workTimes: this.fb.array([]),
    });
  }
  saveProjectDesc() {
    this.docRef.update({
      name: this.projectDesc.value.name,
      desc: this.projectDesc.value.desc,
      startTime: this.projectDesc.value.startTime,
      endTime: this.projectDesc.value.endTime,
      lifecycleStage: this.projectDesc.value.lifecycleStage,
      gitHub: this.projectDesc.value.gitHub,
      site:this.projectDesc.value.site
    });
  }
}
