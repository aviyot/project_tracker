import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire//auth';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthModule } from './auth/auth.module';

import { NewProjectComponent } from './components/new-project/new-project.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProjectComponent } from './components/project/project.component';
import { ProjectListComponent } from './components/project-list/project-list.component';
import { AngularMaterialModule } from './angular-material/angular-material.module';
import { TodoFormComponent } from './components/todo/todo-form/todo-form.component';
import { WorkTimeFormComponent } from './components/work-time/work-time-form/work-time-form.component';
import { ProjectDescFormComponent } from './components/description/project-desc-form/project-desc-form.component';
import { ToolFormComponent } from './components/tool/tool-form/tool-form.component';
import { FeatureFormComponent } from './components/feature/feature-form/feature-form.component';
import { QuestionAnswerFormComponent } from './components/question-answer/question-answer-form/question-answer-form.component';
import { DescriptionComponent } from './components/description/description/description.component';
import { ToolsComponent } from './components/tool/tools/tools.component';
import { TodosComponent } from './components/todo/todos/todos.component';
import { WorkTimesComponent } from './components/work-time/work-times/work-times.component';
import { FeaturesComponent } from './components/feature/features/features.component';
import { QuestionsComponent } from './components/question-answer/questions/questions.component';
import { FormatPipe } from './pipes/format.pipe';
import { DatePipe } from '@angular/common';
import { ChallengeFormComponent } from './components/challenge/challenge-form/challenge-form.component';
import { ChallengesComponent } from './components/challenge/challenges/challenges.component';
import { SubPipe } from './pipes/sub.pipe';
import { ProjectSummaryComponent } from './components/project-summary/project-summary.component';
import { FormDataComponent } from './components/common-components/form-data/form-data.component';
import { ShowDataComponent } from './components/common-components/show-data/show-data.component';
import { GeneralFormComponent } from './components/common-components/general-form/general-form.component';
import { FormDataViewComponent } from './components/common-components/form-data-view/form-data-view.component';

@NgModule({
  declarations: [
    AppComponent,
    NewProjectComponent,
    ProjectComponent,
    ProjectListComponent,
    TodoFormComponent,
    WorkTimeFormComponent,
    ProjectDescFormComponent,
    ToolFormComponent,
    FeatureFormComponent,
    QuestionAnswerFormComponent,
    DescriptionComponent,
    ToolsComponent,
    TodosComponent,
    WorkTimesComponent,
    FeaturesComponent,
    QuestionsComponent,
    FormatPipe,
    ChallengeFormComponent,
    ChallengesComponent,
    SubPipe,
    ProjectSummaryComponent,
    FormDataComponent,
    ShowDataComponent,
    GeneralFormComponent,
    FormDataViewComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AuthModule,
    AngularMaterialModule,
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
