import { Component, Input, OnInit } from '@angular/core';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { Feature } from 'src/models/feature.model';
import { Project } from 'src/models/project.model';
import { FormState } from 'src/models/ui/form-state';

@Component({
  selector: 'app-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.css']
})
export class FeaturesComponent implements OnInit {
  @Input() selectedProject: Project;
  @Input() docRef;
  featureState:FormState;
  constructor() { }

  ngOnInit(): void {
    this.featureState = { add: false, edit: false, selectedIndex: null };

  }

  addFeature() {
    this.featureState.add = !this.featureState.add;
  }
  editFeature(index: number) {
    if (this.featureState.selectedIndex !== index)
      this.featureState.edit = true;
    else this.featureState.edit = !this.featureState.edit;
    this.featureState.selectedIndex = index;
  }

  deleteFeature(feature: Feature) {
    this.docRef.update({
      features: firebase.firestore.FieldValue.arrayRemove(feature),
    });
  }

}
