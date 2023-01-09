import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Project } from 'src/models/project.model';
import { FormDataConfigService } from 'src/app/services/forms-data-config/form-data-config.service';
import {
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { MatTabGroup } from '@angular/material/tabs';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css'],
})
export class ProjectComponent implements OnInit {
  @Input() selectedProject: Project;
  @Input() projectSection: number;
  @Input() projectsCollectionRef: AngularFirestoreCollection;
  @ViewChild('matGr') matGr: MatTabGroup;

  edit = false;
  add = false;
  projectDocRef: AngularFirestoreDocument;
  selectedIndex: number;

  projectSections: any[] = [];
  constructor(private formDataConfigService: FormDataConfigService) {}

  ngOnInit(): void {
    this.projectSections = this.formDataConfigService.getControls();
  }

  ngOnChanges(): void {
    this.projectDocRef = this.projectsCollectionRef.doc(
      this.selectedProject.id
    );
  }
}
