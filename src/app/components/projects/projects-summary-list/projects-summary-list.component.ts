import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { Project } from 'src/models/project.model';

@Component({
  selector: 'app-projects-summary-list',
  templateUrl: './projects-summary-list.component.html',
  styleUrls: ['./projects-summary-list.component.scss'],
})
export class ProjectsSummaryListComponent implements OnInit {
  @Input() editable: boolean = false;
  @Input() projects: Project[];
  @Output() itemSelected = new EventEmitter();
  @Input() detial: boolean;
  showFullPath = false;
  constructor() {}

  ngOnInit(): void {}

  onShowFullPath(full: boolean) {
    this.showFullPath = full;
  }

  selectProject(projectIndex) {
    this.itemSelected.emit(projectIndex);
  }
}
