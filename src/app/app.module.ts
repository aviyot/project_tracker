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

import { NewProjectComponent } from './components/projects/new-project/new-project.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProjectComponent } from './components/projects/project/project.component';
import { ProjectsNameListComponent } from './components/projects/projects-name-list/projects-name-list.component';
import { AngularMaterialModule } from './angular-material/angular-material.module';
import { FormatPipe } from './pipes/format.pipe';
import { DatePipe } from '@angular/common';
import { SubPipe } from './pipes/sub.pipe';
import { ProjectsSummaryListComponent } from './components/projects/projects-summary-list/projects-summary-list.component';
import { ProjectSectionComponent } from './components/projects/project/project-section/project-section.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { ProjectSummaryComponent } from './components/projects/projects-summary-list/project-summary/project-summary.component';
import { ProjectSectionFormComponent } from './components/projects/project/project-section-form/project-section-form.component';
import { SectionItemComponent } from './components/projects/project/project-section/section-item/section-item.component';
import { FormActionToolbarComponent } from './components/shared/form-action-toolbar/form-action-toolbar.component';
import { ItemFieldComponent } from './components/projects/project/project-section/section-item/item-field/item-field.component';

@NgModule({
  declarations: [
    AppComponent,
    NewProjectComponent,
    ProjectsNameListComponent,
    FormatPipe,
    SubPipe,
    ProjectsSummaryListComponent,
    ProjectSectionComponent,
    ProjectsComponent,
    ProjectSummaryComponent,
    NewProjectComponent,
    ProjectComponent,
    ProjectSectionFormComponent,
    SectionItemComponent,
    FormActionToolbarComponent,
    ItemFieldComponent,
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
