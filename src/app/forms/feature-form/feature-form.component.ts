import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFirestoreDocument } from '@angular/fire/firestore';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { Feature } from 'src/models/feature.model';

@Component({
  selector: 'app-feature-form',
  templateUrl: './feature-form.component.html',
  styleUrls: ['./feature-form.component.css']
})
export class FeatureFormComponent implements OnInit {

  @Input('feature') featureData: Feature | null;
  @Input('docRef')
  docRef: AngularFirestoreDocument<firebase.firestore.DocumentData>;
  feature: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.feature = this.fb.group({
      name: ['',Validators.required],
      desc: [''],
      startDate: [''],
      endDate: [''],
      progress: [''],
    });

    if(this.featureData) {
      this.feature.setValue(this.featureData);
    }
  }

  addFeature(){
    this.docRef.update({
      features:firebase.firestore.FieldValue.arrayUnion(this.feature.value)
    })

  }

  saveFeature(){

    this.docRef.update({
      features:firebase.firestore.FieldValue.arrayRemove(this.featureData)
    }).then(()=>{
         this.addFeature();
    })


  }
}
