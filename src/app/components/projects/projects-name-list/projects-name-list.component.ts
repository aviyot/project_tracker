import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { ListAction } from 'src/models/list-action';
import { Project } from 'src/models/project.model';

@Component({
  selector: 'app-projects-name-list',
  templateUrl: './projects-name-list.component.html',
  styleUrls: ['./projects-name-list.component.scss'],
})
export class ProjectsNameListComponent implements OnInit {
  @Input() projects: Project[];
  @Output() itemSelected = new EventEmitter<ListAction>();
  /*   addItem: ListAction = { action: 'ADD_ITEM' };
  viewItem: ListAction = { action: 'VIEW_ITEM', item: selectedIndex }; */
  constructor() {}

  ngOnInit(): void {}

  onSelectedItem(action: ListAction) {
    this.itemSelected.emit(action);
  }
}
