import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonRadioInputOption } from 'src/app/shared/models/components/ion-radio-input-option';
import { IonRadiosConfig } from 'src/app/shared/models/components/ion-radios-config';
import { IonSelectConfig } from 'src/app/shared/models/components/ion-select-config';

@Component({
  selector: 'app-selection',
  templateUrl: './selection.component.html',
  styleUrls: ['./selection.component.scss'],
})
export class SelectionComponent implements OnInit {
  config: IonSelectConfig = {
    inputLabel: {
      classes: '',
      text: 'label - radio',
    },
    forceListItems: false,
    multiple: false,
    disabled: false,
    placeholder: 'Selection',
    alertOptions: {
      cssClass: '',
    },
    idKey: 'id',
    labelKey: 'label',
  };
  configB: IonSelectConfig = {
    inputLabel: {
      classes: '',
      text: 'label - checkbox',
    },
    forceListItems: false,
    multiple: true,
    disabled: false,
    placeholder: 'Selection',
    alertOptions: {
      cssClass: '',
    },
    idKey: 'id',
    labelKey: 'label',
  };
  options = [
    {
      id: 'fcghhjhk',
      label: 'Option 1'
    },
    {
      id: 'fcghhjhkss',
      label: 'Option 2'
    }
  ];
  selectionForm: FormGroup = this.fb.group({
    select: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    filled: 'Lorem ipsum',
    focused: 'Type here',
    password: ['', Validators.required],
  });
  public checkBoxes = [
    { val: 'Checkbox off', isChecked: false, indeterminate: false, disable: false },
    { val: 'Checkbox off disabled', isChecked: false, indeterminate: false, disable: true },
    { val: 'Checkbox on', isChecked: true, indeterminate: false, disable: false },
    { val: 'Checkbox on disabled', isChecked: true, indeterminate: false, disable: true },
    { val: 'Checkbox indecised', isChecked: false, indeterminate: true, disable: false },
    { val: 'Checkbox indecised disabled', isChecked: false, indeterminate: true, disable: true }
  ];
  radioOptions: Array<IonRadioInputOption> = [
    { label: 'Sunt de acord', id: true },
    { label: 'Nu sunt de acord', id: false },
  ];
  radioConfig: IonRadiosConfig = {
    mode: 'chip',
    inputLabel: {
      text: 'Radio button',
    },
  };
  radioForm: FormGroup = this.fb.group({
    radio: ['', [Validators.required]],
  });
  constructor(private fb: FormBuilder) { }

  ngOnInit() { }

}
