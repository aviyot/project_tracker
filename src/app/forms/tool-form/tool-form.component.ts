import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestoreDocument } from '@angular/fire/firestore';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Tool } from 'src/models/tool.model';

import firebase from 'firebase/app';
import 'firebase/firestore';
import { ToolType } from 'src/types/toolType.type';

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
  toolTypes:ToolType[];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.toolTypes = ["frontend","backend"]
    this.tool = this.fb.group({
      name: [''],
      desc: [''],
      purpose: [''],
      ver: [''],
      webSite: [''],
      githubLink: [''],
      npmLink: [''],
      type:['']
    });

    if(this.toolData) {
      this.tool.patchValue(this.toolData);
    }
  }

  addTool(){
    this.docRef.update({
      tools:firebase.firestore.FieldValue.arrayUnion(this.tool.value)
    }).then(()=>{
      this.tool.reset();
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
