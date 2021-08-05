import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonInputConfig } from '../shared/models/components/ion-input-config';
import { IonTextItem } from '../shared/models/components/ion-text-item';

@Component({
  selector: 'app-style-guide',
  templateUrl: './style-guide.page.html',
  styleUrls: ['./style-guide.page.scss'],
})
export class StyleGuidePage implements OnInit {
  label: IonTextItem = {
    text: 'Default',
    classes: '',
    slot: 'end',
  };
  config: IonInputConfig = {
    placeholder: '',
    type: 'tel',
    inputMode: 'tel',
    size: 100,
    inputLabel: this.label,
    clearable: true,
    inputClasses: '',
    minLength: 10,
    maxLength: 10,
    bgwhite: true,
    disabled: false,
  };
  styleForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
  }

}
