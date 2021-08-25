import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Project } from 'src/models/project.model';
import { FormDataConfigService } from 'src/app/services/forms-data-config/form-data-config.service';
import {
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css'],
})
export class ProjectComponent implements OnInit {
  @Input() selectedProject: Project;
  edit = false;
  add = false;
  @Input() projectsCollectionRef: AngularFirestoreCollection;
  projectDocRef: AngularFirestoreDocument;
  selectedIndex: number;

  projectSections: any[] = [];
  constructor(private formDataConfigService: FormDataConfigService) {}

  ngOnInit(): void {
    this.projectSections = this.formDataConfigService.getControls();
    this.projectDocRef = this.projectsCollectionRef.doc(
      this.selectedProject.id
    );
  }
}
