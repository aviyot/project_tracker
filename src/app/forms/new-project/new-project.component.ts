import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Project } from 'src/models/project.model';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.css'],
})
export class NewProjectComponent implements OnInit {
  projects: Project[] = [];
  currentProject?:Project

  projectForm = this.fb.group({
    name: [''],
    desc: [''],
    startTime: [''],
    endTime: [''],
    lifecycleStage: [''],
    gitHub: [''],
    tool: this.fb.group({
      name: [''],
      desc: [''],
      purpose: [''],
      ver: [''],
      githubLink: [''],
      npmLink: [''],
    }),
    feature: this.fb.group({
      name: [''],
      desc: [''],
      startDate: [''],
      endDate: [''],
      progress: [''],
    }),
    question: this.fb.group({
      question: [''],
      questionTime: [''],
      lifecycleStageId: [''],
      featureId: [''],
      answered: [''],
      answer: [''],
      answerTime: [''],
      answerLinks: this.fb.group({
        from: [''],
        links: [''],
        prefer: [''],
      }),
    }),
  });

  constructor(private fb: FormBuilder) {}
  ngOnInit(): void {
    console.log(typeof this.projectForm.value);
  }

  getFormData() {
    console.log(this.projectForm.get('tool.name')?.value);
  }

  saveFormData() {
    this.currentProject = {...this.projectForm.value};
    console.log(this.currentProject);
  }
}
