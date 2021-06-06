import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestoreDocument } from '@angular/fire/firestore';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Tool } from 'src/models/tool.model';

import firebase from 'firebase/app';
import 'firebase/firestore';

@Component({
  selector: 'app-tool-form',
  templateUrl: './tool-form.component.html',
  styleUrls: ['./tool-form.component.css'],
})
export class ToolFormComponent implements OnInit {
  @Input('tool') toolData: Tool | null;
  @Input('docRef')
  docRef: AngularFirestoreDocument<firebase.firestore.DocumentData>;
  tool: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.tool = this.fb.group({
      name: [''],
      desc: [''],
      purpose: [''],
      ver: [''],
      webSite: [''],
      githubLink: [''],
      npmLink: [''],
    });

    if(this.toolData) {
      this.tool.setValue(this.toolData);
    }
  }

  addTool(){
    this.docRef.update({
      tools:firebase.firestore.FieldValue.arrayUnion(this.tool.value)
    })

  }

  saveTool(){

    this.docRef.update({
      tools:firebase.firestore.FieldValue.arrayRemove(this.toolData)
    }).then(()=>{
         this.addTool();
    })


  }
}
