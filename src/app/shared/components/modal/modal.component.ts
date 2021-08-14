import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IonInputConfig } from '../../models/components/ion-input-config';
import { IonTextItem } from '../../models/components/ion-text-item';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {

  ionicForm: FormGroup;

  isFormSubmitted = false;

  // eslint-disable-next-line @typescript-eslint/naming-convention
  CHECK_LIST = [
    { name: 'Photography', value: 'Photography', checked: true },
    { name: 'Blogging', value: 'Blogging' },
    { name: 'Cooking', value: 'Cooking' },
    { name: 'Singing', value: 'Singing' },
    { name: 'Dancing', value: 'Dancing' },
    { name: 'Pottery', value: 'Pottery' },
    { name: 'Knitting', value: 'Knitting' },
    { name: 'Knitting', value: 'Knittinddg' },
    { name: 'Knitting', value: 'Knitdating' },
    { name: 'Knitting', value: 'Knisdstting' },
  ];
  label: IonTextItem = {
    text: 'Default',
    classes: '',
    slot: 'end',
  };
  config: IonInputConfig = {
    placeholder: 'Caută',
    type: 'search',
    inputMode: 'search',
    size: 100,
    /* inputLabel: this.label, */
    clearable: false,
    inputClasses: '',
    minLength: 10,
    maxLength: 10,
    bgwhite: true,
    disabled: false,
    removeInputItemBaseLine: true,
    isInputFocused: false,
  };
  searchForm: FormGroup = this.fb.group({
    search: [2, [Validators.required]],
  });
  constructor(
    private formBuilder: FormBuilder,
    private fb: FormBuilder
  ) {
    this.ionicForm = this.formBuilder.group({
      checkboxArrayList: this.formBuilder.array([], [Validators.required])
    });

    this.onLoadCheckboxStatus();
  }
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }

  updateCheckControl(cal: any, o: any) {
    if (o.checked) {
      cal.push(new FormControl(o.value));
    } else {
      cal.controls.forEach((item: FormControl, index) => {
        if (item.value === o.value) {
          cal.removeAt(index);
          return;
        }
      });
    }
  }

  onLoadCheckboxStatus() {
    const checkboxArrayList: FormArray = this.ionicForm.get('checkboxArrayList') as FormArray;
    this.CHECK_LIST.forEach(o => {
      this.updateCheckControl(checkboxArrayList, o);
    });
  }

  onSelectionChange(e, i) {
    const checkboxArrayList: FormArray = this.ionicForm.get('checkboxArrayList') as FormArray;
    this.CHECK_LIST[i].checked = e.target.checked;
    this.updateCheckControl(checkboxArrayList, e.target);

  }

  submitForm() {
    this.isFormSubmitted = true;
    if (!this.ionicForm.valid) {
      console.log('Please provide all the required values!');
      return false;
    } else {
      console.log('Form Submitted', this.ionicForm.value);
    }
  }

}
