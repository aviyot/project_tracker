import { Injectable } from '@angular/core';
import { ControlName } from 'src/models/form-config.model';

import { ChallengesService } from './challenges/challenges.service';
import { FeaturesService } from './features/features.service';
import { HowTodoService } from './how-todo/how-todo.service';
import { ProjectDescService } from './project-desc/project-desc.service';
import { TodoService } from './todo/todo.service';
import { ToolsService } from './tools/tools.service';
import { WorkTimesService } from './work-times/work-times.service';

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
    private projectDescService: ProjectDescService
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

  getControls(): ControlName[] {
    let controls: ControlName[] = [];
    this.formDataConfigs.forEach((formDataConfig) => {
      controls.push(formDataConfig.formConfig.controlName);
    });

    return [...controls];
  }
}
