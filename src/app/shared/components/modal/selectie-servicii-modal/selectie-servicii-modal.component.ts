import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl, FormArray } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { unsubscriberHelper } from 'src/app/core/helpers/unsubscriber.helper';
import { IonInputConfig } from 'src/app/shared/models/components/ion-input-config';
import { IonTextItem } from 'src/app/shared/models/components/ion-text-item';

@Component({
  selector: 'app-selectie-servicii-modal',
  templateUrl: './selectie-servicii-modal.component.html',
  styleUrls: ['./selectie-servicii-modal.component.scss'],
})
export class SelectieServiciiModalComponent implements OnInit, OnDestroy {

  @Input() checkList!: any;
  list!: any;
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
    debounce: 200,
  };
  searchForm: FormGroup = this.fb.group({
    search: ['', [Validators.required]],
  });
  public subscriptions = new Subscription();
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
    // load check list to list
    this.list = this.checkList;
    //
    this.subscriptions.add(this.searchForm.valueChanges
      .pipe(distinctUntilChanged()) // makes sure the value has actually changed.
      .subscribe(
        data => {
          if (data.search !== '') {
            this.list = this.searching(data.search);
          } else {
            this.list = this.checkList;
          }

        }
      ));
  }

  updateCheckControl(cal: any, o: any) {
    if (o.checked) {
      cal.push(new FormControl(o.value));
    } else {
      cal.controls.forEach((item: FormControl, index: any) => {
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
    const indexOfData = this.checkList.findIndex((v: any) => v.value === e.target.value);
    if (indexOfData > -1) {
      const checkboxArrayList: FormArray = this.ionicForm.get('checkboxArrayList') as FormArray;
      this.checkList[indexOfData].checked = e.target.checked;
      this.updateCheckControl(checkboxArrayList, e.target);
    }
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
      //...this.ionicForm.value
      checkList: this.checkList
    });
  }
  closeModal() {
    this.modalController.dismiss({
      dismissed: true,
      ...this.ionicForm.value,
      checkboxArrayList: null
    });
  }
  searching(st: string) {
    if (st) {
      const d = this.checkList;
      return d.filter((v: any) => (v.first.toLowerCase().indexOf(st.toLowerCase()) > -1));
    }
  }
  ngOnDestroy(): void {
    unsubscriberHelper(this.subscriptions);
  }

}
