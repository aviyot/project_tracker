import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.css'],
})
export class TodoFormComponent implements OnInit {
  @Input() dataIn: any;
  formGroup: FormGroup;
  @Input() formDesc: any;
  @Output() dataOut = new EventEmitter();
  constructor(private fb: FormBuilder) {}
  ngOnInit(): void {
    this.formGroup = this.fb.group(this.formDesc);
    this.formGroup.valueChanges.subscribe((value) => {
      this.dataOut.emit(value);
    });

    if (this.dataIn) {
      this.formGroup.patchValue(this.dataIn);
    }
  }
}
