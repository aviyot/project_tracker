import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { Project } from 'src/models/project.model';

@Component({
  selector: 'app-projects-name-list',
  templateUrl: './projects-name-list.component.html',
  styleUrls: ['./projects-name-list.component.scss'],
})
export class ProjectsNameListComponent implements OnInit {
  projects: Observable<Project[]> = new Observable<Project[]>();
  @Output() itemSelected = new EventEmitter();
  @Input() detial: boolean;
  constructor(
    private firestore: AngularFirestore,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.user.subscribe((user) => {
      if (user) {
        this.projects = this.firestore
          .collection('users')
          .doc(user.uid)
          .collection('projects', (ref) => ref.orderBy('projectDesc.name'))
          .valueChanges({ idField: 'id' }) as Observable<Project[]>;
      }
    });
  }

  closeMenu() {
    this.itemSelected.emit();
  }
}
