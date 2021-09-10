import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { unsubscriberHelper } from 'src/app/core/helpers/unsubscriber.helper';
import { IonInputConfig } from 'src/app/shared/models/components/ion-input-config';
import { IonSelectConfig } from 'src/app/shared/models/components/ion-select-config';
import { IonTextItem } from 'src/app/shared/models/components/ion-text-item';


export interface DemoPatientData {
  first: string;
  second: string;
  third: string;
  fourth?: string;
  fifth?: string;
  sixth?: string;
  value: string;
}


@Component({
  selector: 'app-pacient',
  templateUrl: './pacient.component.html',
  styleUrls: ['./pacient.component.scss'],
})
export class PacientComponent implements OnInit, OnDestroy {

  list!: any;

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
  pacientData: DemoPatientData[] = [];
  componentFormGroup: FormGroup = this.fb.group({
    medicOptionTip: ['', [Validators.required]],
    optionValue: ['', [Validators.required]],
  });
  constructor(
    private fb: FormBuilder,
    private modalController: ModalController
  ) {
  }
  ngOnInit(): void {
    // load check list to list
    // this.list = this.medicData;
    //
    this.subscriptions.add(this.searchForm.valueChanges
      .pipe(distinctUntilChanged()) // makes sure the value has actually changed.
      .subscribe(
        data => {
          if (data.search !== '') {
            this.list = this.searching(data.search);
          } else {
            // this.list = this.medicData;
          }

        }
      ));
  }
  submit(data: any) {
    this.modalController.dismiss({
      dismissed: true,
      data: data?.first
    });
  }
  closeModal() {
    this.modalController.dismiss({
      dismissed: true,
      data: null
    });
  }
  searching(st: string) {
    if (st) {
      const d = this.list;
      return d.filter((v: any) => (v.first.toLowerCase().indexOf(st.toLowerCase()) > -1));
    }
  }
  ngOnDestroy(): void {
    unsubscriberHelper(this.subscriptions);
  }

}
