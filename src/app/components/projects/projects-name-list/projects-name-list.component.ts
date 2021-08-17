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
  @Input() projects: Project[];
  @Output() itemSelected = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}

  addNewProject() {
    this.itemSelected.emit();
  }
  closeMenu(selectedIndex) {
    this.itemSelected.emit(selectedIndex);
  }
}
