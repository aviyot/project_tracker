import { Component, OnInit, Input } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectData } from 'src/models/project-data.model';
import { WorkTime } from 'src/models/work-time.model';
import { HowTodo } from '../../../../src/models/howtodo.model';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.css'],
})
export class NewProjectComponent implements OnInit {
  projects: ProjectData[] = [];
  currentProject: ProjectData;
  doc_id: string;
  user: any;
  new: boolean = true;
  projectForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private firestore: AngularFirestore,
    private auth: AngularFireAuth,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.createform();
  }
  ngOnInit(): void {
    this.auth.user.subscribe((user) => {
      if (user) {
        this.user = user;

        this.activatedRoute.paramMap.subscribe((p) => {
          this.doc_id = p.get('project_id');
          if (this.doc_id) {
            this.new = false;
            this.firestore
              .collection('users')
              .doc(user.uid)
              .collection('projects')
              .doc(p.get('project_id'))
              .get()
              .subscribe((p) => {
                const { features, questions, todos, tools, howTodos,workTimes} =
                  p.data();
                this.projectForm.patchValue(p.data());
                this.addFeature(features);

                this.addQuestion(questions);
                questions.forEach((el, index) => {
                  this.addAnswerLink(index, el.answerLinks);
                });

                this.addTool(tools);

                this.addTodo(todos);
                this.addHowTodo(howTodos);
                howTodos.forEach((el, index) => {
                  this.addHowtodoSteps(index, el.steps);
                });
                this.addWorkTime(workTimes);
              });
          }
        });
      }
    });
  }

  createform() {
    this.projectForm = this.fb.group({
      name: ['', [Validators.required]],
      desc: [''],
      startTime: [''],
      endTime: [''],
      lifecycleStage: [''],
      gitHub: [''],
      site:[''],
      tools: this.fb.array([]),
      todos: this.fb.array([]),
      features: this.fb.array([]),
      questions: this.fb.array([]),
      howTodos: this.fb.array([]),
      workTimes:this.fb.array([])
    });
  }

  saveFormData(exit?:boolean) {
    this.currentProject = { ...this.projectForm.value };
    if (this.new) {
      if (this.user.uid) {
        if (this.projectForm.valid) {
          this.firestore
            .collection('users')
            .doc(this.user.uid)
            .collection('projects')
            .add(this.currentProject)
            .then(() => {
              this.projectForm.reset();
            });
        } else {
          console.log('form not vaild');
        }
      } else {
        console.log('invaild user data');
      }
    } else {
      if (this.user.uid) {
        if (this.projectForm.valid) {
          this.firestore
            .collection('users')
            .doc(this.user.uid)
            .collection('projects')
            .doc(this.doc_id)
            .update(this.currentProject)
            .then(() => {
              alert("data saved");
              if(exit){
              this.projectForm.reset();
              this.router.navigate(['/', 'app-project', this.doc_id]);
              }
            });
        } else {
          console.log('form not vaild');
        }
      } else {
        console.log('invaild user data');
      }
    }
  }

  addTodo(data?: any[]) {
    const formArray = this.projectForm.get('todos') as FormArray;
    const todo = this.fb.group({
      title: [''],
      detail: [''],
      date: [''],
      done: [false],
    });
    if (data) {
      data.forEach((dataItem) => {
        formArray.push(
          this.fb.group({
            title: [dataItem.title],
            detail: [dataItem.detail],
            date: [dataItem.date],
            done: [dataItem.done],
          })
        );
      });
    } else {
      formArray.push(todo);
    }
  }

  addTool(data?: any[]) {
    const formArray = this.projectForm.get('tools') as FormArray;
    const tool = this.fb.group({
      name: [''],
      desc: [''],
      purpose: [''],
      ver: [''],
      webSite: [''],
      githubLink: [''],
      npmLink: [''],
    });
    if (data) {
      data.forEach((dataItem) => {
        formArray.push(
          this.fb.group({
            name: [dataItem.name],
            desc: [dataItem.desc],
            purpose: [dataItem.purpose],
            ver: [dataItem.ver],
            webSite: [dataItem.webSite],
            githubLink: [dataItem.githubLink],
            npmLink: [dataItem.npmLink],
          })
        );
      });
    } else {
      formArray.push(tool);
    }
  }

  addFeature(data?: any[]) {
    const formArray = this.projectForm.get('features') as FormArray;
    const feature = this.fb.group({
      name: [''],
      desc: [''],
      startDate: [''],
      endDate: [''],
      progress: [''],
    });
    if (data) {
      data.forEach((dataItem) => {
        formArray.push(
          this.fb.group({
            name: [dataItem.name],
            desc: [dataItem.desc],
            startDate: [dataItem.startDate],
            endDate: [dataItem.endTime],
            progress: [dataItem.progress],
          })
        );
      });
    } else {
      formArray.push(feature);
    }
  }

  addQuestion(data?: any[]) {
    const formArray = this.projectForm.get('questions') as FormArray;
    const question = this.fb.group({
      question: [''],
      questionTime: [''],
      lifecycleStageId: [''],
      featureId: [''],
      answered: [''],
      answer: [''],
      answerTime: [''],
      answerLinks: this.fb.array([]),
    });
    if (data) {
      data.forEach((dataItem) => {
        formArray.push(
          this.fb.group({
            question: [dataItem.question],
            questionTime: [dataItem.questionTime],
            lifecycleStageId: [dataItem.lifecycleStageId],
            featureId: [dataItem.featureId],
            answered: [dataItem.answered],
            answer: [dataItem.answer],
            answerTime: [dataItem.answerTime],
            answerLinks: this.fb.array([]),
          })
        );
      });
    } else {
      formArray.push(question);
    }
  }

  addAnswerLink(index, data?: any[]) {
    const answerLinkRef = this.getAnswerLinks(index);
    const answerLink = this.fb.group({
      from: [''],
      links: [''],
      prefer: [''],
    });

    if (data) {
      data.forEach((dataItem) => {
        answerLinkRef.push(
          this.fb.group({
            from: [dataItem.from],
            links: [dataItem.links],
            prefer: [dataItem.prefer],
          })
        );
      });
    } else {
      answerLinkRef.push(answerLink);
    }
  }

  addHowTodo(data?: HowTodo[]) {
    const formArray = this.projectForm.get('howTodos') as FormArray;
    const howTodo = this.fb.group({
      title: [''],
      desc: [''],
      ordered: [false],
      steps: this.fb.array([]),
    });

    if (data) {
      data.forEach((dataItem) => {
        formArray.push(
          this.fb.group({
            title: [dataItem.title],
            desc: [dataItem.desc],
            ordered: [dataItem.ordered],
            steps: this.fb.array([]),
          })
        );
      });
    } else {
      formArray.push(howTodo);
    }
  }

  addHowtodoSteps(index: number, data?: string[]) {
    const todoStepsRef = this.getHowtodoSteps(index);
    const todoStep = this.fb.control('');
    if (data) {
      data.forEach((dataItem) => {
        todoStepsRef.push(this.fb.control(dataItem));
      });
    } else {
      todoStepsRef.push(todoStep);
    }
  }
  getHowtodoSteps(index): FormArray {
   console.log((this.projectForm.get('howTodos') as FormArray).at(index));
    return (this.projectForm.get('howTodos') as FormArray)
      .at(index)
      .get('steps') as FormArray;
  }

  getAnswerLinks(index): FormArray {
    return (this.projectForm.get('questions') as FormArray)
      .at(index)
      .get('answerLinks') as FormArray;
  }

  removeAnswerLink(questionIndex, answerLinkIndex) {
    this.getAnswerLinks(questionIndex).removeAt(answerLinkIndex);
  }

  addWorkTime(data?:WorkTime[]){
    const formArray = this.projectForm.get('workTimes') as FormArray;
    const workTime = this.fb.group({
      startTime:[''],
      endTime:[''],
      task:['']
    })

    if(data) {
      data.forEach((dataItem)=>{
        formArray.push(this.fb.group({
          startTime:[dataItem.startTime],
          endTime:[dataItem.endTime],
          task:[dataItem.task]
        }))

      })
    }
    else {
      formArray.push(workTime);
    }
  }
}
