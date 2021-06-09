import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Project } from 'src/models/project.model';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { WorkTime } from 'src/models/work-time.model';
import { FormState } from 'src/models/ui/form-state';
import { Tool } from 'src/models/tool.model';
import { Feature } from 'src/models/feature.model';
import { QuestionAnswer } from 'src/models/question-answer.model';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css'],
})
export class ProjectComponent implements OnInit,AfterViewInit{
  projects: Observable<Project[]> = new Observable<Project[]>();
  selectedProject: any;
  edit = false;
  add = false;
  docRef = null;
  selectedIndex: number;
  workTimeState: FormState;
  projectDescState: FormState;
  featureState:FormState;
  toolState: FormState;
  qaState:FormState;
  anchors = ['desc','tools','todos','worktimea','features','questions','howtodos']
  private fragment: string;

  constructor(
    private firestore: AngularFirestore,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private route: ActivatedRoute
  ) {
    // console.log(this.router.getCurrentNavigation().extras.state);
  }

  ngOnInit(): void {
    this.workTimeState = { add: false, edit: true, selectedIndex: null };
    this.projectDescState = { add: false, edit: false, selectedIndex: null };
    this.toolState = { add: false, edit: false, selectedIndex: null };
    this.featureState = { add: false, edit: false, selectedIndex: null };
    this.qaState  = { add: false, edit: false, selectedIndex: null };
    this.activatedRoute.paramMap.subscribe((p) => {
      this.docRef = this.firestore
        .collection('users')
        .doc('5cj0ysyGqdPdmEXjkWRGtEBA4ig2')
        .collection('projects')
        .doc(p.get('project_id'));

      this.selectedProject = this.docRef
        .valueChanges({ idField: 'id' })
        .subscribe((p) => {
          this.selectedProject = p;
        });
    });

    this.route.fragment.subscribe(fragment => { this.fragment = fragment;
    //this.router.navigate(['./'],{fragment:this.fragment})
  });
  }

  
  ngAfterViewInit(): void {

 
    try {
      document.querySelector('#' + this.fragment).scrollIntoView();
    } catch (e) { }
  }

  deleteProject() {
    let answer = confirm('delete?');

    if (answer) {
      this.firestore
        .collection('users')
        .doc('5cj0ysyGqdPdmEXjkWRGtEBA4ig2')
        .collection('projects')
        .doc(this.selectedProject.id)
        .delete()
        .then(() => {
          console.log('deleted');
        });
    }
  }

  editProject() {
    if (confirm(' EDIT ? ')) {
      this.router.navigate([
        '/',
        'new-project',
        'edit',
        this.selectedProject.id,
      ]);
    }
  }

  addTodo() {
    this.add = !this.add;
  }

  editTodo(todoIndex) {
    if (this.selectedIndex !== todoIndex) this.edit = true;
    else this.edit = !this.edit;

    this.selectedIndex = todoIndex;
  }

  deleteTodo(todo) {
    this.docRef.update({
      todos: firebase.firestore.FieldValue.arrayRemove(todo),
    });
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

  editProjectDesc() {
    this.projectDescState.edit = !this.projectDescState.edit;
  }

  addTool(){
    this.toolState.add = !this.toolState.add;
  }
  editTool(index:number){
    if (this.toolState.selectedIndex !== index)
    this.toolState.edit = true;
  else this.toolState.edit = !this.toolState.edit;
  this.toolState.selectedIndex = index;
  }

  deleteTool(tool:Tool){
    this.docRef.update({
      tools: firebase.firestore.FieldValue.arrayRemove(tool),
    });
  }

  addFeature(){
    this.featureState.add = !this.featureState.add;
  }
  editFeature(index:number){
    if (this.featureState.selectedIndex !== index)
    this.featureState.edit = true;
  else this.featureState.edit = !this.featureState.edit;
  this.featureState.selectedIndex = index;
  }

  deleteFeature(feature:Feature){
    this.docRef.update({
      features: firebase.firestore.FieldValue.arrayRemove(feature),
    });
  }

  addQA(){
    this.qaState.add = !this.qaState.add;
  }
  editQA(index:number){
    if (this.qaState.selectedIndex !== index)
    this.qaState.edit = true;
  else this.qaState.edit = !this.qaState.edit;
  this.qaState.selectedIndex = index;
  }

  deleteQA(qa:QuestionAnswer){
    this.docRef.update({
      questions: firebase.firestore.FieldValue.arrayRemove(qa),
    });
  }
}
