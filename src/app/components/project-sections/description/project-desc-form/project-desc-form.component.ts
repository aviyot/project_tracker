import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import { AngularFirestoreDocument } from '@angular/fire/firestore';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectData } from 'src/models/project-data.model';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { IsTimestampService } from 'src/app/services/is-timestamp.service';
import { LIFECYCLE_STAGE } from 'src/types/lifecycleStage.type';

@Component({
  selector: 'app-project-desc-form',
  templateUrl: './project-desc-form.component.html',
  styleUrls: ['./project-desc-form.component.css'],
})
export class ProjectDescFormComponent implements OnInit, OnChanges {
  projectDesc: FormGroup;
  @Input('project') projectData: ProjectData | any;
  @Input('docRef')
  docRef: AngularFirestoreDocument<firebase.firestore.DocumentData>;
  @Input('added') added = false;
  @Output('newProject') newProject = new EventEmitter<ProjectData>();
  projectStatuses: LIFECYCLE_STAGE[] = [
    'planning',
    'design',
    'prototyping',
    'development',
    'testing',
    'publishing',
    'maintenance',
  ];

  projectForm: FormGroup;
  sites: FormGroup;
  constructor(
    private fb: FormBuilder,
    private timestampServ: IsTimestampService
  ) {}

  ngOnInit(): void {
    this.projectDesc = this.fb.group({
      name: ['', Validators.required],
      desc: [''],
      startTime: [new Date()],
      endTime: [],
      lifecycleStage: [this.projectStatuses[0]],
      gitHub: [''],
      site: [''],
      sites: this.fb.array([]),
      filePath: [''],
    });

    this.sites = this.fb.group({
      url: ['', Validators.required],
      main: [false],
      udatedAutoGithub: [false],
    });

    //update project description
    if (this.projectData) {
      let startTime: any = this.projectData.projectDesc.startTime;
      let endTime: any = this.projectData.projectDesc.endTime;

      if (
        this.projectData.projectDesc.startTime &&
        this.timestampServ.isTimestamp(this.projectData.projectDesc.startTime)
      )
        startTime = this.projectData.projectDesc.startTime.toDate();
      else startTime = null;
      if (
        this.projectData.projectDesc.endTime &&
        this.timestampServ.isTimestamp(this.projectData.projectDesc.endTime)
      )
        endTime = this.projectData.projectDesc.endTime.toDate();
      else endTime = null;
      if (this.projectData.projectDesc.sites) {
        this.projectData.projectDesc.sites.forEach((site) => {
          this.sites.patchValue(site);
          this.getSites().push(this.sites);
        });
      }

      this.projectDesc.patchValue({
        ...this.projectData.projectDesc,
        startTime: startTime,
        endTime: endTime,
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
      projectDesc: this.projectDesc,
      tools: this.fb.array([]),
      todos: this.fb.array([]),
      features: this.fb.array([]),
      questions: this.fb.array([]),
      workTimes: this.fb.array([]),
    });
  }
  saveProjectDesc() {
    if (this.projectDesc.valid) {
      this.docRef
        .update({
          'projectDesc.name': this.projectDesc.value.name,
          'projectDesc.desc': this.projectDesc.value.desc,
          'projectDesc.startTime': this.projectDesc.value.startTime,
          'projectDesc.endTime': this.projectDesc.value.endTime,
          'projectDesc.lifecycleStage': this.projectDesc.value.lifecycleStage,
          'projectDesc.gitHub': this.projectDesc.value.gitHub,
          'projectDesc.site': this.projectDesc.value.site,
          'projectDesc.filePath': this.projectDesc.value.filePath,
        })
        .then(() => {
          if (
            this.projectData.projectDesc.sites &&
            this.projectData.projectDesc.sites.length
          ) {
            this.projectData.projectDesc.sites.forEach((site) => {
              this.docRef
                .update({
                  'projectDesc.sites':
                    firebase.firestore.FieldValue.arrayRemove(site),
                })
                .then(() => {
                  this.projectDesc.value.sites.forEach((site) => {
                    this.docRef.update({
                      'projectDesc.sites':
                        firebase.firestore.FieldValue.arrayUnion(site),
                    });
                  });
                });
            });
          } else {
            this.projectDesc.value.sites.forEach((site) => {
              this.docRef.update({
                'projectDesc.sites':
                  firebase.firestore.FieldValue.arrayUnion(site),
              });
            });
          }
        });
    } else {
      alert('טופס לא תקין');
    }
  }

  getSites(): FormArray {
    return this.projectDesc.get('sites') as FormArray;
  }

  addSite() {
    let mainSite: boolean;
    if (this.getSites().length > 0) mainSite = false;
    else mainSite = true;
    this.getSites().push(
      this.fb.group({
        url: ['', Validators.required],
        main: [mainSite],
        udatedAutoGithub: [false],
      })
    );
  }

  removeSite(siteIndex) {
    this.getSites().removeAt(siteIndex);
  }
}
