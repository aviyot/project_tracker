import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { NewProjectComponent } from './components/new-project/new-project/new-project.component';
import { ProjectComponent } from './components/projects-list/project/project.component';

const routes: Routes = [
  { path: 'sign-in', component: SignInComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'new-project/edit/:project_id', component: NewProjectComponent },
  { path: 'new-project', component: NewProjectComponent },
  { path: 'app-projects', component: ProjectComponent },
  { path: 'app-project/:project_id', component: ProjectComponent },
  { path: '', pathMatch: 'full', redirectTo: 'app-projects' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      anchorScrolling: 'enabled',
      scrollPositionRestoration: 'enabled',
      onSameUrlNavigation: 'reload',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
