import { Component, Input, OnInit } from '@angular/core';
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
  @Input() checkList!: any;

  ionicForm: FormGroup;

  isFormSubmitted = false;

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
  }
  ngOnInit(): void {
    this.onLoadCheckboxStatus();
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
    if (this.checkList) {
      const checkboxArrayList: FormArray = this.ionicForm.get('checkboxArrayList') as FormArray;
      this.checkList.forEach((o: any) => {
        this.updateCheckControl(checkboxArrayList, o);
      });
    }

  }

  onSelectionChange(e: any, i: string | number) {
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
      ...this.ionicForm.value
    });
  }
  closeModal() {
    this.modalController.dismiss({
      dismissed: true,
      ...this.ionicForm.value,
      checkboxArrayList: null
    });
  }

}
