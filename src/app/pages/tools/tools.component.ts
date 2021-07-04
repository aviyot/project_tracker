import { Component, Input, OnInit } from '@angular/core';
import { Project } from 'src/models/project.model';
import { FormState } from 'src/models/ui/form-state';

import firebase from 'firebase/app';
import 'firebase/firestore';
import { Tool } from 'src/models/tool.model';

@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.css'],
})
export class ToolsComponent implements OnInit {
  @Input() selectedProject: Project;
  @Input() docRef;
  toolState: FormState;
  showDetial = false;
  selectedIndex = null;
  constructor() {}

  ngOnInit(): void {
    this.toolState = { add: false, edit: false, selectedIndex: null };
  }

  addTool() {
    this.toolState.add = !this.toolState.add;
  }
  editTool(index: number) {
    if (this.toolState.selectedIndex !== index) this.toolState.edit = true;
    else this.toolState.edit = !this.toolState.edit;
    this.toolState.selectedIndex = index;
  }

  deleteTool(tool: Tool) {
    this.docRef.update({
      tools: firebase.firestore.FieldValue.arrayRemove(tool),
    });
  }

  toogleDetail(index) {
    this.showDetial = !this.showDetial;
    this.selectedIndex = index;
  }
}
