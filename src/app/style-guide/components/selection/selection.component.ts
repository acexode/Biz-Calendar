import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
      text: 'label',
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
  options = [
    {
      id: 'fcghhjhk',
      label: 'szrdxtfcyguvhbjn'
    },
    {
      id: 'fcghhjhk',
      label: 'szrdxtfcyguvhbjn'
    }
  ];
  selectionForm: FormGroup = this.fb.group({
    select: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    filled: 'Lorem ipsum',
    focused: 'Type here',
    password: ['', Validators.required],
  });
  constructor(private fb: FormBuilder) { }

  ngOnInit() { }

}
