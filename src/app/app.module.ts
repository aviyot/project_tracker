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

import { NewProjectComponent } from './forms/new-project/new-project.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProjectComponent } from './pages/project/project.component';
import { ProjectListComponent } from './pages/project-list/project-list.component';
import { AngularMaterialModule } from './angular-material/angular-material.module';
import { TodoFormComponent } from './forms/todo-form/todo-form.component';
import { WorkTimeFormComponent } from './forms/work-time-form/work-time-form.component';
import { ProjectDescFormComponent } from './forms/project-desc-form/project-desc-form.component';
import { ToolFormComponent } from './forms/tool-form/tool-form.component';
import { FeatureFormComponent } from './forms/feature-form/feature-form.component';
import { QuestionAnswerFormComponent } from './forms/question-answer-form/question-answer-form.component';
import { DescriptionComponent } from './pages/description/description.component';
import { ViewDataComponent } from './pages/view-data/view-data.component';
import { ToolsComponent } from './pages/tools/tools.component';
import { TodosComponent } from './pages/todos/todos.component';
import { WorkTimesComponent } from './pages/work-times/work-times.component';
import { FeaturesComponent } from './pages/features/features.component';
import { QuestionsComponent } from './pages/questions/questions.component';
import { FormatPipe } from './pipes/format.pipe';
import { DatePipe } from '@angular/common';
import { ChallengeFormComponent } from './forms/challenge-form/challenge-form.component';
import { ChallengesComponent } from './pages/challenges/challenges.component';

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
    ViewDataComponent,
    ToolsComponent,
    TodosComponent,
    WorkTimesComponent,
    FeaturesComponent,
    QuestionsComponent,
    FormatPipe,
    ChallengeFormComponent,
    ChallengesComponent,
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
