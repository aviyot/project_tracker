import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-feature-form',
  templateUrl: './feature-form.component.html',
  styleUrls: ['./feature-form.component.css'],
})
export class FeatureFormComponent implements OnInit {
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
