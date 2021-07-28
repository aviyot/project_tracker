import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Project } from 'src/models/project.model';
import { FormState } from 'src/models/ui/form-state';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.css'],
})
export class DescriptionComponent implements OnInit, OnChanges {
  @Input() selectedProject: Project;
  @Input() docRef;
  @Input() editable = true;
  projectDescState: FormState;
  showFullPath = false;
  constructor() {}

  ngOnInit(): void {
    this.projectDescState = { add: false, edit: false, selectedIndex: null };
  }
  ngOnChanges(change: SimpleChanges) {
    if (change.selectedProject.previousValue) {
      if (
        change.selectedProject.currentValue !==
        change.selectedProject.previousValue
      ) {
        this.projectDescState.edit = false;
      }
    }
  }
  onShowFullPath(full: boolean) {
    this.showFullPath = full;
  }

  editProjectDesc() {
    this.projectDescState.edit = !this.projectDescState.edit;
  }
}
