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

@NgModule({
  declarations: [
    AppComponent,
    NewProjectComponent,
    ProjectComponent,
    ProjectListComponent,
    TodoFormComponent
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
    AngularMaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
