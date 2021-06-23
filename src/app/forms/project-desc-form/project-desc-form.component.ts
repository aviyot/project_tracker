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
      filePath:['']
    });

    if (this.projectData) {
      this.projectDesc.patchValue({
        name: this.projectData.projectDesc.name,
        desc: this.projectData.projectDesc.desc,
        startTime: this.projectData.projectDesc.startTime,
        endTime: this.projectData.projectDesc.endTime,
        lifecycleStage: this.projectData.projectDesc.lifecycleStage,
        gitHub: this.projectData.projectDesc.gitHub,
        site: this.projectData.projectDesc.startTime,
        filePath:this.projectData.projectDesc.filePath
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
      projectDesc:this.projectDesc,
      tools: this.fb.array([]),
      todos: this.fb.array([]),
      features: this.fb.array([]),
      questions: this.fb.array([]),
      workTimes: this.fb.array([]),
    });
  }
  saveProjectDesc() {
    this.docRef.update({
      'projectDesc.name': this.projectDesc.value.name,
      'projectDesc.desc': this.projectDesc.value.desc,
      'projectDesc.startTime': this.projectDesc.value.startTime,
      'projectDesc.endTime': this.projectDesc.value.endTime,
      'projectDesc.lifecycleStage': this.projectDesc.value.lifecycleStage,
      'projectDesc.gitHub': this.projectDesc.value.gitHub,
      'projectDesc.site':this.projectDesc.value.site,
      'projectDesc.filePath':this.projectDesc.value.filePath
    });
  }
}
