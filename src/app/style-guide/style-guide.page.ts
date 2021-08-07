import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonInputConfig } from '../shared/models/components/ion-input-config';
import { IonTextItem } from '../shared/models/components/ion-text-item';
import { inputStyleGuideConfigurations } from './input-config-data/input-config-data';

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
    placeholder: 'Placeholder',
    type: 'text',
    inputMode: 'text',
    size: 100,
    inputLabel: this.label,
    clearable: true,
    inputClasses: '',
    minLength: 10,
    maxLength: 10,
    bgwhite: true,
    disabled: false,
  };
  inputStyleGuide = inputStyleGuideConfigurations;
  styleForm: FormGroup = this.fb.group({
    text: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    filled: 'Lorem ipsum',
    focused: 'Type here',
    password: ['', Validators.required],
  });
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    // this.styleForm.disable();
  }

}
