import { Injectable } from '@angular/core';
import { FormConfig } from 'src/models/form-config.model';
import { ChallengesService } from './challenges/challenges.service';
import { FeaturesService } from './features/features.service';
import { HowTodoService } from './how-todo/how-todo.service';
import { ProjectDescService } from './project-desc/project-desc.service';
import { ProjectSitesService } from './project-sites/project-sites.service';
import { TodoService } from './todo/todo.service';
import { ToolsService } from './tools/tools.service';
import { WorkTimesService } from './work-times/work-times.service';

/* type Types =
  | 'text'
  | 'textarea'
  | 'date'
  | 'select'
  | 'checkbox'
  | 'href'
  | 'array';
class SectionField {
  constructor(
    private field: string,
    private value: any[],
    private type: Types,
    private label: string,
    private option?: string[]
  ) {}
}

export class ProjectSection {
  constructor(
    private type: 'array' | 'map' | 'field',
    private sectionName: string,
    private sectionFields: SectionField[]
  ) {}
}

let todo = new ProjectSection('array', 'todos', [
  new SectionField('title', [''], 'text', 'שם משימה'),
  new SectionField('detail', [''], 'textarea', 'פרטים'),
  new SectionField('startTime', [new Date()], 'date', 'זמן התחלה'),
  new SectionField('endTime', [''], 'date', 'תאריך סיום'),
  new SectionField('status', [''], 'select', 'סטטוס'),
  new SectionField('gitCommit', [''], 'text', 'קומיט'),
  new SectionField('makingDesc', [''], 'textarea', 'איך נעשה'),
]);

let challenge = new ProjectSection('array', 'challenges', [
  new SectionField('title', [''], 'text', 'קושי'),
  new SectionField('detail', [''], 'textarea', 'תיאור'),
  new SectionField('solution', [''], 'textarea', 'פתרונות'),
]);

let feature = new ProjectSection('array', 'features', [
  new SectionField('title', [''], 'text', 'פיצר'),
  new SectionField('detail', [''], 'textarea', 'פרטים'),
  new SectionField('startTime', [new Date()], 'date', 'זמן התחלה'),
  new SectionField('endTime', [''], 'date', 'תאריך סיום'),
  new SectionField('status', [''], 'select', 'סטטוס'),
]);

let howTodos = new ProjectSection('array', 'howTodos', [
  new SectionField('title', [''], 'text', 'פיצר'),
  new SectionField('detail', [''], 'textarea', 'פרטים'),
  new SectionField('byOrder', [true], 'checkbox', 'לפי סדר'),
  new SectionField(
    'steps',
    [
      [
        new ProjectSection('array', 'steps', [
          new SectionField('title', [''], 'text', 'פיצר'),
          new SectionField('detail', [''], 'textarea', 'פרטים'),
        ]),
      ],
    ],
    'array',
    'איך לעשות'
  ),
]);

let projectDesc = new ProjectSection('map', 'projectDesc', [
  new SectionField('name', [''], 'text', 'פיצר'),
  new SectionField('desc', [''], 'textarea', 'פרטים'),
  new SectionField('startTime', [new Date()], 'date', 'זמן התחלה'),
  new SectionField('endTime', [''], 'date', 'תאריך סיום'),
  new SectionField('lifecycleStage', ['planning'], 'select', 'שלב', [
    'planning',
    'design',
    'prototyping',
    'development',
    'testing',
    'publishing',
    'maintenance',
  ]),
  new SectionField(
    'sites',
    [
      new ProjectSection('array', 'site', [
        new SectionField('label', [''], 'text', 'שם'),
        new SectionField('site', [''], 'href', 'קישור'),
      ]),
    ],
    'array',
    'אתרים'
  ),
]);

let tool = new ProjectSection('array', 'tools', [
  new SectionField('name', [''], 'text', ''),
  new SectionField('desc', [''], 'textarea', 'תיאור'),
  new SectionField('desc', [''], 'textarea', 'תיאור'),
  new SectionField('desc', [''], 'textarea', 'תיאור'),
  new SectionField('purpose', [null], 'select', 'מטרה', [
    'frontend',
    'Backend',
    'style',
  ]),
]);
 */
@Injectable({
  providedIn: 'root',
})
export class FormDataConfigService {
  private formDataConfigs: any[];

  constructor(
    private featuresService: FeaturesService,
    private toolsService: ToolsService,
    private howTodoService: HowTodoService,
    private todoService: TodoService,
    private challengesService: ChallengesService,
    private workTimesService: WorkTimesService,
    private projectDescService: ProjectDescService,
    private projectSitesService: ProjectSitesService
  ) {
    this.formDataConfigs = [
      projectDescService,
      toolsService,
      featuresService,
      todoService,
      howTodoService,
      challengesService,
      workTimesService,
    ];
  }

  getFormConfig(sectionName: string) {
    switch (sectionName) {
      case 'howTodos':
        return this.howTodoService.formConfig;
      case 'todos':
        return this.todoService.formConfig;
      case 'challenges':
        return this.challengesService.formConfig;
      case 'features':
        return this.featuresService.formConfig;
      case 'workTimes':
        return this.workTimesService.formConfig;
      case 'tools':
        return this.toolsService.formConfig;
      case 'projectDesc':
        return this.projectDescService.formConfig;
      default:
        return null;
    }
  }

  getControls(): string[] {
    let controls: any[] = [];
    this.formDataConfigs.forEach((formDataConfig) => {
      controls.push(formDataConfig.formConfig.controlName);
    });

    return [...controls];
  }
  formControlConfig(formName) {
    switch (formName) {
      /*  case 'howTodos':
        return this.howTodoService.formControlConfig();
      case 'todos':
        return this.todoService.formControlConfig();
        */
      case 'challenges':
        return this.challengesService.formControlConfig();
      /*   case 'features':
        return this.featuresService.formControlConfig();
      case 'workTimes':
        return this.workTimesService.formControlConfig();
      case 'tools':
        return this.toolsService.formControlConfig(); */
      default:
        return null;
    }
  }
}
