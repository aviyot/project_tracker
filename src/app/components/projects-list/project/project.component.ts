import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Project } from 'src/models/project.model';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { DataStructureService } from 'src/app/services/firebase/data-structure.service';
import { Timestamp } from '@firebase/firestore-types';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css'],
})
export class ProjectComponent implements OnInit, AfterViewInit {
  projects: Observable<Project[]> = new Observable<Project[]>();
  user: any;
  selectedProject: Project;
  edit = false;
  add = false;
  docRef = null;
  selectedIndex: number;
  anchors = [
    'desc',
    'tools',
    'todos',
    'worktimea',
    'features',
    'questions',
    'howtodos',
  ];
  private fragment: string;

  constructor(
    private firestore: AngularFirestore,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private route: ActivatedRoute,
    private auth: AngularFireAuth,
    private dataStructureService: DataStructureService
  ) {
    // console.log(this.router.getCurrentNavigation().extras.state);
  }

  ngOnInit(): void {
    //this.dataStructureService.deleteFields();

    this.auth.user.subscribe((currentUser) => {
      this.user = currentUser;
      this.activatedRoute.paramMap.subscribe((p) => {
        if (p.get('project_id')) {
          this.docRef = this.firestore
            .collection('users')
            .doc(this.user.uid)
            .collection('projects')
            .doc(p.get('project_id'));

          this.docRef.valueChanges({ idField: 'id' }).subscribe((p) => {
            /*     p.todos.forEach((todo) => {
              if (todo.date instanceof Object) {
                console.log(todo, todo.date.toDate());
              }
            }); */

            this.selectedProject = p;
          });
        }
      });
    });

    this.route.fragment.subscribe((fragment) => {
      this.fragment = fragment;
      //this.router.navigate(['./','app-project',this.selectedProject.id],{fragment:this.fragment})
    });
  }

  ngAfterViewInit(): void {
    try {
      //document.querySelector('#' + this.fragment).scrollIntoView();
    } catch (e) {}
  }

  deleteProject() {
    if (confirm('delete?')) {
      this.docRef.delete().then(() => {
        this.router.navigate(['/', 'app-projects']);
      });
    }
  }

  editProject() {
    if (confirm(' EDIT ? ')) {
      this.router.navigate([
        '/',
        'new-project',
        'edit',
        this.selectedProject.id,
      ]);
    }
  }
}