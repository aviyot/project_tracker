import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { Project } from 'src/models/project.model';
import { FormDataConfigService } from 'src/app/services/forms-data-config/form-data-config.service';
import {
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { ProjectSection } from 'src/types/project-sections.type';
import { MatTabGroup } from '@angular/material/tabs';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css'],
})
export class ProjectComponent implements OnInit {
  @Input() selectedProject: Project;
  @Input() projectSection: number;
  edit = false;
  add = false;
  @Input() projectsCollectionRef: AngularFirestoreCollection;
  projectDocRef: AngularFirestoreDocument;
  selectedIndex: number;
  @ViewChild('matGr') matGr: MatTabGroup;

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
