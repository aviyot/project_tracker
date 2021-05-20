import { Component, OnInit, Input } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProjectData } from 'src/models/project-data.model';
import { Project } from 'src/models/project.model';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.css'],
})
export class NewProjectComponent implements OnInit {
  projects: ProjectData[] = [];
  currentProject: ProjectData;
  doc_id:string;
  user: any;
  new :boolean = true;
  
  projectForm = this.fb.group({
    name: ['',[Validators.required]],
    desc: [''],
    startTime: [''],
    endTime: [''],
    lifecycleStage: [''],
    gitHub: [''],
    tools: this.fb.array([]),
    features:this.fb.array([]),
    questions: this.fb.array([]),
  });

  constructor(
    private fb: FormBuilder,
    private firestore: AngularFirestore,
    private auth: AngularFireAuth,
    private activatedRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.auth.user.subscribe((user) => {
      this.user = user;
    });
    this.activatedRoute.paramMap.subscribe((p) => {
    this.new = false;
      this.doc_id = p.get('project_id');
         this.firestore
         .collection('users')
         .doc('5cj0ysyGqdPdmEXjkWRGtEBA4ig2')
         .collection('projects').doc(p.get('project_id')).get().subscribe((p)=>{
      
           this.projectForm.patchValue(p.data());
         });
       });
  }

  getFormData() {
    console.log(this.projectForm.value);
  }

  saveFormData() {
    this.currentProject = { ...this.projectForm.value };
    if(this.new) {
      if (this.user.uid ) {
        if(this.projectForm.valid) {
        this.firestore
          .collection('users')
          .doc(this.user.uid)
          .collection('projects')
          .add(this.currentProject)
          .then(() => {
            this.projectForm.reset();
          });
        }
        else {
          console.log("form not vaild");
        }
      } else {
        console.log('invaild user data');
      }

    }
    else {

      if (this.user.uid ) {
        if(this.projectForm.valid) {
        this.firestore
          .collection('users')
          .doc(this.user.uid)
          .collection('projects').doc(this.doc_id)
          .update(this.currentProject)
          .then(() => {
            console.log("data updated");
            this.projectForm.reset();
          });
        }
        else {
          console.log("form not vaild");
        }
      } else {
        console.log('invaild user data');
      }
    }
   
  }

  addTool() {
    const tools = this.projectForm.get("tools") as FormArray;
    tools.push(
      this.fb.group({
        name: [''],
        desc: [''],
        purpose: [''],
        ver: [''],
        webSite: [''],
        githubLink: [''],
        npmLink: [''],
      })
    );
  }

  addFeature() {
    const features = this.projectForm.get("features") as FormArray;
    features.push(
      this.fb.group({
        name: [''],
        desc: [''],
        startDate: [''],
        endDate: [''],
        progress: [''],
      })
    );
  }

  addQuestion() {
    const questions = this.projectForm.get("questions") as FormArray;
    questions.push(
      this.fb.group({
        question: [''],
        questionTime: [''],
        lifecycleStageId: [''],
        featureId: [''],
        answered: [''],
        answer: [''],
        answerTime: [''],
        answerLinks: this.fb.array([])
      })
    );

  }

  addAnswerLink(index){
    const answerLink = this.getAnswerLinks(index) 
    answerLink.push(this.fb.group({
      from: [''],
      links: [''],
      prefer: [''],
    }))
  }

  getAnswerLinks(index) : FormArray{
    return ((this.projectForm.get('questions') as FormArray).at(index).get('answerLinks') as FormArray);
  }

  removeAnswerLink(questionIndex,answerLinkIndex){
    this.getAnswerLinks(questionIndex).removeAt(answerLinkIndex);
  }
}
