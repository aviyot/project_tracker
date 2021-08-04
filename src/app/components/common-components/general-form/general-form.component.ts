import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormConfig } from 'src/models/form-config.model';

@Component({
  selector: 'app-general-form',
  templateUrl: './general-form.component.html',
  styleUrls: ['./general-form.component.scss'],
})
export class GeneralFormComponent implements OnInit {
  @Input() dataIn: any;
  @Output() dataOut = new EventEmitter();
  @Input() controlFields: FormConfig;
  controlFieldKeys: string[];
  formGroup: FormGroup;
  @Input() formDesc: any;
  constructor(private fb: FormBuilder) {}
  ngOnInit(): void {
    this.controlFieldKeys = Object.keys(this.controlFields.controlFields);
    this.formGroup = this.fb.group(this.formDesc);
    this.formGroup.valueChanges.subscribe((value) => {
      this.dataOut.emit(value);
    });

    if (this.dataIn) {
      this.formGroup.patchValue(this.dataIn);
    }
  }
}
