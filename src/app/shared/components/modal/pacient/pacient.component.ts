import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { persons } from 'src/app/core/configs/endpoints';
import { unsubscriberHelper } from 'src/app/core/helpers/unsubscriber.helper';
import { RequestService } from 'src/app/core/services/request/request.service';
import { IonInputConfig } from 'src/app/shared/models/components/ion-input-config';
import { IonSelectConfig } from 'src/app/shared/models/components/ion-select-config';
import { IonTextItem } from 'src/app/shared/models/components/ion-text-item';
import { GrupNouModalComponent } from '../grup-nou-modal/grup-nou-modal.component';
import { NewPacientModalComponent } from '../new-pacient-modal/new-pacient-modal.component';


export interface DemoPatientData {
  first: string;
  second: string;
  third: string;
  fourth?: string;
  fifth?: string;
  sixth?: string;
  value: string;
  list?: Array<any>;
}


@Component({
  selector: 'app-pacient',
  templateUrl: './pacient.component.html',
  styleUrls: ['./pacient.component.scss'],
})
export class PacientComponent implements OnInit, OnDestroy {
  segment = {
    one: 'Pacienți',
    two: 'Grupuri'
  };
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
  grupuris: DemoPatientData[] = [
    {
      first: 'Grupul vesel',
      second: '8 membri',
      third: '',
      value: 'Grupul vesel',
    },
    {
      first: 'Grupul Non-alcoolicii anonimi',
      second: '32 membri',
      third: '',
      value: 'Grupul Non-alcoolicii anonimi',
    },
    {
      first: 'Grupul celor 4',
      second: '4 membri',
      third: '',
      value: 'Grupul celor 4',
    },
    {
      first: 'Clasa a II-a',
      second: '28 membri',
      third: '35',
      value: 'Clasa a II-a',
    },
    {
      first: 'Grupul Albinuțelor',
      second: '22 membri',
      third: ' ',
      value: 'Grupul Albinuțelor',
    }
  ];
  componentFormGroup: FormGroup = this.fb.group({
    medicOptionTip: ['', [Validators.required]],
    optionValue: ['', [Validators.required]],
  });
  currentSegement: any = this.segment.one;
  getPersons$: Subscription;
  constructor(
    private fb: FormBuilder,
    private modalController: ModalController,
    private reqS: RequestService,
  ) {
  }
  async presentPacientnew() {
    const modal = await this.modalController.create({
      component: NewPacientModalComponent,
      cssClass: 'biz-modal-class',
      backdropDismiss: false,
      componentProps: {},
    });
    await modal.present();
    const d = await modal.onWillDismiss();
  }
   async presentGrupNouModal() {
    const modal = await this.modalController.create({
      component: GrupNouModalComponent,
      cssClass: 'biz-modal-class',
      backdropDismiss: false,
      componentProps: {},
    });
    await modal.present();
     const { data } = await modal.onWillDismiss();
     if (data.data) {
      this.grupuris.push(data.data);
     }
  }
  ngOnInit(): void {
    this.getPersons();
    // load check list to list
    this.dataSwitch();
    //
    this.subscriptions.add(this.searchForm.valueChanges
      .pipe(distinctUntilChanged()) // makes sure the value has actually changed.
      .subscribe(
        data => {
          if (data.search !== '') {
            this.list = this.searching(data.search);
          } else {
            this.dataSwitch();
          }
        }
      ));
  }
  dataSwitch(data: any = this.currentSegement) {
    switch (this.currentSegement) {
      case this.segment.one:
        this.list = this.pacientData;
        break;
      case this.segment.two:
        this.list = this.grupuris;
        break;
      default:
        this.list = this.pacientData;
    }
  }
  segmentChanged(ev: any) {
    this.currentSegement = ev?.detail?.value || '';
    this.dataSwitch();
  }
  get segmentToShow() {
     return this.currentSegement;
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
  getPersons() {
    this.getPersons$ = this.reqS.post(persons.getPersons, {
      searchString: '',
    })
      .subscribe(
        (d: any) => {
          console.log(d);
        },
        _err => console.log(_err)

      );
  }
  ngOnDestroy(): void {
    unsubscriberHelper(this.subscriptions);
    unsubscriberHelper(this.getPersons$);
  }

}
