import { Component, OnInit } from '@angular/core';
import { Project } from 'src/models/project.model';
import { AuthService } from './auth/auth.service';
import { ProjectsDataService } from './services/projects/projects-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  projects: Project[] = [];
  user: any;
  userSignIn: 'LOAD' | 'SIGNIN' | 'INABLE_SIGNIN' | 'ERROR' = 'LOAD'; //user login status

  constructor(
    private authService: AuthService,
    private projectsDataService: ProjectsDataService,
  ) {}
  ngOnInit() {
    this.authService.user.subscribe(
      (user) => {
        this.user = user;
        if (user) {
          this.userSignIn = 'SIGNIN';
        } else {
          this.userSignIn = 'INABLE_SIGNIN';
        }
      },
      () => {
        this.userSignIn = 'ERROR';
      },
    );

    this.projectsDataService.projects.subscribe((projects) => {
      this.projects = projects;
    });
  }
}
