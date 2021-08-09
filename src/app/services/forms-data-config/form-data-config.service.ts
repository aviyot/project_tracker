import { Injectable } from '@angular/core';
import { ChallengesService } from './challenges/challenges.service';
import { FeaturesService } from './features/features.service';
import { HowTodoService } from './how-todo/how-todo.service';
import { ProjectDescService } from './project-desc/project-desc.service';
import { ProjectSitesService } from './project-sites/project-sites.service';
import { TodoService } from './todo/todo.service';
import { ToolsService } from './tools/tools.service';
import { WorkTimesService } from './work-times/work-times.service';

@Injectable({
  providedIn: 'root',
})
export class FormDataConfigService {
  constructor(
    private howTodoService: HowTodoService,
    private todoService: TodoService,
    private challengesService: ChallengesService,
    private featuresService: FeaturesService,
    private workTimesService: WorkTimesService,
    private toolsService: ToolsService
  ) {}

  getFormConfig(formName: string) {
    switch (formName) {
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
      default:
        return null;
    }
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
