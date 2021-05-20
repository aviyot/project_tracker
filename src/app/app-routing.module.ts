import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { NewProjectComponent } from './forms/new-project/new-project.component';
import { ProjectComponent } from './pages/project/project.component';

const routes: Routes = [
  { path: 'sign-in', component: SignInComponent },
  { path: 'sign-up', component: SignUpComponent },
  {path:'new-project',component:NewProjectComponent},
  {path:'new-project/edit/:project_id',component:NewProjectComponent},
  {path:'app-project/:project_id',component:ProjectComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
