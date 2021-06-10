import { Component, Input, OnInit } from '@angular/core';
import { Description } from 'src/models/description';
import { Project } from 'src/models/project.model';
import { FormState } from 'src/models/ui/form-state';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.css']
})
export class DescriptionComponent implements OnInit {
@Input() selectedProject:Project;
@Input() docRef;
projectDescState:FormState;

  constructor() { }

  ngOnInit(): void {
    this.projectDescState = { add: false, edit: false, selectedIndex: null };

  }

  editProjectDesc() {
    this.projectDescState.edit = !this.projectDescState.edit;
  }

}
