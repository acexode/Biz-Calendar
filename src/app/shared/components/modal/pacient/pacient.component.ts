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
  pacientData: DemoPatientData[] = [
    {
      first: 'Angela Ghica Protopopescu',
      second: 'F',
      third: '47',
      value: 'Angela Ghica Protopopescu',
    },
    {
      first: 'Ciprian Costescu',
      second: 'M',
      third: '67',
      value: 'Ciprian Costescu',
    },
    {
      first: 'Ciprian Costescu',
      second: 'F',
      third: '67',
      value: 'Ciprian Costescu',
    },
    {
      first: 'Camil Oprea Micălăceanu',
      second: 'F',
      third: '47',
      value: 'Camil Oprea Micălăceanu',
    },
    {
      first: 'Corneliu Pricop',
      second: '-',
      third: '**** *** 843',
      value: 'Corneliu Pricop',
    },
    {
      first: 'Maria Pop Postolache',
      second: 'M',
      third: '67',
      value: 'Maria Pop Postolache',
    },
    {
      first: 'Mariana Romascanu',
      second: 'F',
      third: '47',
      value: 'Mariana Romascanu',
    },
    {
      first: 'Marin Voroncea',
      second: 'M',
      third: '67',
      value: 'Marin Voroncea',
    },
    {
      first: 'Mario Andrea Zanardi',
      second: '-',
      third: '**** *** 843',
      value: 'Mario Andrea Zanardi',
    },
    {
      first: 'Ionica Zorban',
      second: '-',
      third: '**** *** 843',
      value: 'Ionica Zorban',
    }
  ];
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
    this.list = this.pacientData;
    //
    this.subscriptions.add(this.searchForm.valueChanges
      .pipe(distinctUntilChanged()) // makes sure the value has actually changed.
      .subscribe(
        data => {
          if (data.search !== '') {
            this.list = this.searching(data.search);
          } else {
            this.list = this.pacientData;
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
