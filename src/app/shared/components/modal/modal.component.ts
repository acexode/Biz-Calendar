import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
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

  checkList = [
    {
      first: 'Consultație peste vârsta de 4 ani',
      second: 'Servicii paraclinice',
      third: '10,80 pt.',
      value: 'Consultație',
      checked: true
    },
    {
      first: 'Ecografie generală (abdomen + pelvis)',
      second: 'Servicii paraclinice',
      third: '23,45 pt.',
      value: 'Ecografie generală',
    },
    {
      first: 'Ecografie abdominală',
      second: 'Servicii paraclinice',
      third: '12,34 pt.',
      value: 'Ecografie abdominală',
    },
    {
      first: 'EKG standard',
      second: 'Servicii paraclinice',
      third: '12,34 pt.',
      value: 'EKG',
    },
    {
      first: 'Consult peste 4 ani',
      second: 'Consultație',
      third: '5 pt.',
      value: 'Consult',
    },
    {
      first: 'Spirometrie',
      second: 'Servicii paraclinice',
      third: '23 pt.',
      value: 'Spirometrie',
    },
    {
      first: 'Pulsoximetrie',
      second: 'Servicii paraclinice',
      third: '10 pt.',
      value: 'Pulsoximetrie',
    },
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
    search: ['', [Validators.required]],
  });
  constructor(
    private formBuilder: FormBuilder,
    private fb: FormBuilder,
    private modalController: ModalController
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
    this.checkList.forEach(o => {
      this.updateCheckControl(checkboxArrayList, o);
    });
  }

  onSelectionChange(e, i) {
    const checkboxArrayList: FormArray = this.ionicForm.get('checkboxArrayList') as FormArray;
    this.checkList[i].checked = e.target.checked;
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
  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      dismissed: true,
      data: this.ionicForm.value
    });
  }

}
