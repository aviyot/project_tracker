import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { Project } from 'src/models/project.model';

import firebase from 'firebase/app';
import 'firebase/firestore';
import { Todo } from 'src/models/todo.model';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css'],
})
export class ProjectListComponent implements OnInit {
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
