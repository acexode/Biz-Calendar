import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { InfoPacientModalComponent } from 'src/app/shared/components/modal/info-pacient-modal/info-pacient-modal.component';
import { SelectieServiciiModalComponent } from 'src/app/shared/components/modal/selectie-servicii-modal/selectie-servicii-modal.component';
import { inputConfigHelper } from 'src/app/shared/data/input-config-helper';
import { BizCustomSelectionConfig } from 'src/app/shared/models/components/biz-custom-selection-config';
import { IonRadioInputOption } from 'src/app/shared/models/components/ion-radio-input-option';
import { IonRadiosConfig } from 'src/app/shared/models/components/ion-radios-config';
import { IonSelectConfig } from 'src/app/shared/models/components/ion-select-config';
import { TextAreaConfig } from 'src/app/shared/models/components/ion-textarea-config';
import { DemoCheckList } from 'src/app/style-guide/components/selection/selection.component';
import { unsubscriberHelper } from 'src/app/core/helpers/unsubscriber.helper';
import { PlatformService } from 'src/app/core/services/platform/platform.service';
import { Router } from '@angular/router';
import { RecurentaComponent } from '../recurenta/recurenta.component';
import { RecurentaModel } from '../recurenta/models/recurenta.model';
import { BizRadioModalComponent } from 'src/app/shared/components/modal/biz-radio-modal/biz-radio-modal.component';
import { MedicModalComponent } from 'src/app/shared/components/modal/medic-modal/medic-modal.component';
import { PacientComponent } from 'src/app/shared/components/modal/pacient/pacient.component';
import { GrupNouModalComponent } from 'src/app/shared/components/modal/grup-nou-modal/grup-nou-modal.component';
import
{ BizSearchableRadioModalComponent }
  from
  'src/app/shared/components/modal/biz-searchable-radio-modal/biz-searchable-radio-modal.component';
import { NewPacientModalComponent } from 'src/app/shared/components/modal/new-pacient-modal/new-pacient-modal.component';
import { CabinetComponent } from 'src/app/shared/components/modal/cabinet/cabinet.component';
import { RequestService } from 'src/app/core/services/request/request.service';
import { cabinet } from 'src/app/core/configs/endpoints';
import { GetCabinetsModel } from 'src/app/core/models/getCabinets.service.model';
import { addHours, isAfter, isBefore, startOfDay } from 'date-fns';
import { GetCabinetSchedulesResponseModel } from 'src/app/core/models/getCabinetSchedules.response.model';
@Component({
  selector: 'app-adauga-programare',
  templateUrl: './adauga-programare.component.html',
  styleUrls: ['./adauga-programare.component.scss'],
})
export class AdaugaProgramareComponent implements OnInit, OnDestroy {
  get l(): IonSelectConfig {
    const locatie: IonSelectConfig = {
      inputLabel: {
        classes: '',
        text: 'Locație',
      },
      forceListItems: false,
      multiple: false,
      disabled: false,
      alertOptions: {
        cssClass: '',
      },
      idKey: 'id',
      labelKey: 'label',
      useIcon: {
        name: 'doctor',
        classes: 'neutral-grey-medium-color'
      }
    };
    return this.isAparaturaOnLine ?
    {...locatie, placeholder: 'required'} :
    {...locatie, placeholder: 'Opțional'};
  }
  pacientInputConfig = inputConfigHelper({
    label: 'Pacient',
    type: 'text',
    placeholder: 'Value',
    custom: {
      useIcon: { name: 'search-custom' }
    }
  });
  dataInputConfig = inputConfigHelper({
    label: 'Data',
    type: 'date',
    placeholder: '08.03.2021',
    custom: {
      mode: 'ios',
      useIcon: {
        name: 'default'
      }
    }
  });
  timeInputConfig = inputConfigHelper({
    label: 'Ora de începere',
    type: 'time',
    placeholder: '09:00',
    custom: {
      mode: 'ios',
      useIcon: {
        name: 'clock'
      }
    }
  });
  tipprogramareConfig: IonRadiosConfig = {
    mode: 'chip',
    inputLabel: {
      text: 'Tip programare',
      classes: ''
    },
    itemClasses: 'mr-12'
  };
  tipprogramareOption: Array<IonRadioInputOption> = [
    { label: 'În cabinet', id: 'În-cabinet' },
    { label: 'On-line', id: 'On-line' },
  ];
  locatieOption = [
    {
      id: 'fcghhjhk',
      label: 'Option 1'
    },
    {
      id: 'kcghhjhkss',
      label: 'Option 2'
    }
  ];
  tipServiciiConfig: IonRadiosConfig = {
    mode: 'chip',
    inputLabel: {
      text: 'Tip programare',
      classes: ''
    },
    itemClasses: 'mr-12'
  };
  tipServiciiOption: Array<IonRadioInputOption> = [
    { label: 'Cu plată', id: 'Cuplată' },
    { label: 'C.N.A.S.', id: 'C.N.A.S.' },
  ];

  timeRadioConfig: IonRadiosConfig = {
    mode: 'chip',
    inputLabel: {
      text: 'Durata (minute)',
      classes: ''
    },
    itemClasses: 'mr-12'
  };
  timeRadioOption: Array<IonRadioInputOption> = [
    { label: '15', id: '15' },
    { label: '20', id: '20' },
    { label: '30', id: '30' },
    { label: '45', id: '45' },
    { label: 'Alta', id: 'Alta' },
  ];
  cabinetConfig = {
    label: 'Cabinet',
    type: 'text',
    placeholder: '',
    custom: {
      mode: 'md',
      useIcon: {
        name: 'cabinet',
        classes: 'neutral-grey-medium-color'
      },
      readonly: true
    },
    labelKey: 'cabinetName',
    idKey: 'cabinetUID'
  };
  medicConfig: IonSelectConfig = {
    inputLabel: {
      classes: '',
      text: 'Medic trimițător',
    },
    forceListItems: false,
    multiple: false,
    disabled: false,
    placeholder: 'Alege',
    alertOptions: {
      cssClass: '',
    },
    idKey: 'id',
    labelKey: 'label',
    useIcon: {
      name: 'doctor',
      classes: 'neutral-grey-medium-color'
    }
  };
  observatiiConfig: TextAreaConfig = {
    textAreaLabel: {
      text: 'Observații recepție',
      classes: '',
      slot: '',
    },
    placeholder: '',
    disabled: false,
  };
  checkList: DemoCheckList[] = [
    {
      first: 'Consultație peste vârsta de 4 ani',
      second: 'Servicii paraclinice',
      third: '10,80 pt.',
      value: 'Consultație',
      checked: false
    },
    {
      first: 'Ecografie generală (abdomen + pelvis)',
      second: 'Servicii paraclinice',
      third: '23,45 pt.',
      value: 'Ecografie generală',
      checked: false
    },
    {
      first: 'Ecografie abdominală',
      second: 'Servicii paraclinice',
      third: '12,34 pt.',
      value: 'Ecografie abdominală',
      checked: false
    },
    {
      first: 'EKG standard',
      second: 'Servicii paraclinice',
      third: '12,34 pt.',
      value: 'EKG',
      checked: false
    },
    {
      first: 'Consult peste 4 ani',
      second: 'Consultație',
      third: '5 pt.',
      value: 'Consult',
      checked: false
    },
    {
      first: 'Spirometrie',
      second: 'Servicii paraclinice',
      third: '23 pt.',
      value: 'Spirometrie',
      checked: false
    },
    {
      first: 'Pulsoximetrie',
      second: 'Servicii paraclinice',
      third: '10 pt.',
      value: 'Pulsoximetrie',
      checked: false
    },
  ];
  cabinetOption: GetCabinetsModel[] = [];
  adugaOptions:  Array<IonRadioInputOption> = [
    { label: 'O persoană', id: 'O persoană' },
    { label: 'Un grup', id: 'Un grup' },
  ];

  aparaturaConfig: BizCustomSelectionConfig = {
    placeholder: 'Alege',
    inputLabel: {
      text: 'Aparatură asociată'
    }
  };
  adaugaProgramareFormGroup$: Subscription;
  isAparaturaOnLine = false;
  adaugaProgramareFormGroup: FormGroup = this.fb.group({
    pacient: ['', [Validators.required]],
    tipprogramare: ['În-cabinet', [Validators.required]],
    locatie: '',
    tipServicii: ['În-cabinet', [Validators.required]],
    data: ['', [Validators.required]],
    oraDeIncepere: ['', [Validators.required]],
    time: ['', [Validators.required]],
    cabinet: ['', [Validators.required]],
    medic:['', [Validators.required]],
    observatii: ['', [Validators.required]]
  });
  isWed = false;
  locatieConfigPlaceholder: string;
  recurentaDetails!: RecurentaModel;
  getCabinets$: Subscription;
  getCabinetScheldules$: Subscription;
  constructor(
    private fb: FormBuilder,
    public modalController: ModalController,
    private pS: PlatformService,
    private router: Router,
    private reqService: RequestService
  ) { }

  ngOnInit() {
    // this.presentCabinent();
    this.getCabinets();
    this.process();
    this.pS.isDesktopWidth$.subscribe(
      v => this.isWed = v
    );
    this.adaugaProgramareFormGroup$ = this.adaugaProgramareFormGroup.get('tipprogramare').valueChanges
      .pipe(distinctUntilChanged())
      .subscribe(data => {
        this.process(data);
      });
  }
  async presentCabinent() {
    const modal = await this.modalController.create({
      component: CabinetComponent,
      cssClass: 'biz-modal-class width-md-100',
      backdropDismiss: true,
      componentProps: {},
    });
    await modal.present();
  }
  async presentNewPacientModal() {
    const modal = await this.modalController.create({
      component: NewPacientModalComponent,
      cssClass: 'biz-modal-class',
      backdropDismiss: false,
      componentProps: {},
    });
    await modal.present();
  }
   async presentBizRadioModal() {
    const modal = await this.modalController.create({
      component: BizRadioModalComponent,
      cssClass: 'biz-modal-class-type-a modal-wrapper-with-232px-height',
      backdropDismiss: true,
      componentProps: {
        options: this.adugaOptions
      },
    });
     await modal.present();
     const { data } = await modal.onWillDismiss();
     if (data) {
       const { radioValue } = data;
      if (radioValue) {
          switch (radioValue) {
            case this.adugaOptions[0].label:
              this.presentNewPacientModal();
              break;
            case this.adugaOptions[1].label:
              this.presentGrupModal();
              break;
            default:
              break;
          }
        }
     }
  }
  async presentGrupModal() {
    const modal = await this.modalController.create({
      component: GrupNouModalComponent,
      cssClass: 'biz-modal-class',
      backdropDismiss: false,
      componentProps: {},
    });
    await modal.present();
    const d = await modal.onWillDismiss();
    const { dismissed, data } = d?.data;
    if(dismissed && data !== '') {
      this.adaugaProgramareFormGroup.patchValue({pacient: data?.first});
    }
  }
  async presentPacient() {
    const modal = await this.modalController.create({
      component: PacientComponent,
      cssClass: 'biz-modal-class',
      backdropDismiss: false,
      componentProps: {},
    });
    await modal.present();
    const d = await modal.onWillDismiss();
    console.log(d);
    const {dismissed , data} = d?.data;
    if(dismissed && data !== '') {
      this.adaugaProgramareFormGroup.patchValue({pacient: data});
    }
  }
  async presentModalRadio() {
    const modal = await this.modalController.create({
      component: BizSearchableRadioModalComponent,
      cssClass: 'biz-modal-class',
      backdropDismiss: false,
      componentProps: {
        options: this.cabinetOption,
        config: this.cabinetConfig
      },
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    const {dismissed, radioValue} = data;
    if (dismissed && radioValue !== '') {
      const d = {
        // physicianUID: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        cabinetUID: radioValue // '3fa85f64-5717-4562-b3fc-2c963f66afa6'
      };
      this.getCabinetScheldules$ = this.reqService
        .post<Array<GetCabinetSchedulesResponseModel>>(cabinet.getCabinetsSchedules, d)
      .subscribe(
        (resps: GetCabinetSchedulesResponseModel[]) => {
          console.log(resps[0]);
          if (resps) {
            if (resps.length > 0) {
              for (const res of resps) {
                console.log(res);
                const startTime = addHours(startOfDay(new Date()), res.startHour);
                const endTime = addHours(startOfDay(new Date()), res.endHour);
                const toCompareDate = new Date(
                  `${this.adaugaProgramareFormGroup.value.data} ${this.adaugaProgramareFormGroup.value.oraDeIncepere}`
                );
                const checkIsBeforeEndTime = isBefore(endTime,
                  toCompareDate
                );
                const checkIsAfterStartTime = isAfter(startTime, toCompareDate);
                console.log({
                  startTime,
                  endTime,
                  toCompareDate,
                  checkIsBeforeEndTime,
                  checkIsAfterStartTime,
                });
                if (!checkIsBeforeEndTime && !checkIsAfterStartTime) {
                  this.adaugaProgramareFormGroup.patchValue({cabinet: radioValue});
                }else{}
              }
            }
          }

      });
    }
  }
  async presentInfoPacientModalModal() {
    const modal = await this.modalController.create({
      component: InfoPacientModalComponent,
      cssClass: 'biz-modal-class-type-a',
      backdropDismiss: true,
      componentProps: {},
    });
    await modal.present();
  }
  async presentModalB() {
    const modal = await this.modalController.create({
      component: SelectieServiciiModalComponent,
      cssClass: 'biz-modal-class',
      backdropDismiss: false,
      componentProps: {
        checkList: this.checkList,
      },
    });
    await modal.present();
  }
  async presentModalRecurentaComponentModal() {
    const modal = await this.modalController.create({
      component: RecurentaComponent,
      cssClass: 'biz-modal-class neutral-grey-light-backdrop',
      backdropDismiss: false,
      componentProps: {
        isModal: true,
      },
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    console.log(data);
    this.recurentaDetails = data?.recurentaData;
  }
  async presentMedicModal() {
    const modal = await this.modalController.create({
      component: MedicModalComponent,
      cssClass: 'biz-modal-class',
      backdropDismiss: false,
      componentProps: {},
    });
    await modal.present();
    const d = await modal.onWillDismiss();
    console.log(d);
    const {dismissed , data} = d?.data;
    if(dismissed && data !== '') {
      this.adaugaProgramareFormGroup.patchValue({medic: data});
    }
  }
  process(data: string = this.locatieFormControl.value) {
    if (data === 'On-line') {
      this.isAparaturaOnLine = true;
      this.adaugaProgramareFormGroup.controls.locatie.clearValidators();
      this.locatieConfigPlaceholder = 'Optional';
    } else {
      this.isAparaturaOnLine = false;
      this.adaugaProgramareFormGroup.controls.locatie.setValidators(Validators.required);
      this.locatieConfigPlaceholder = 'Required';
    }
    this.locatieFormControl.updateValueAndValidity();
  }
  get isAparaturaOnLineStatus() {
    return this.isAparaturaOnLine;
  }
  get locatieFormControl() {
    return this.adaugaProgramareFormGroup.get('locatie') as FormControl;
  }
  get dataFormControl() {
    return this.adaugaProgramareFormGroup.get('data') as FormControl;
  }
  get oraDeIncepereFormControl() {
    return this.adaugaProgramareFormGroup.get('oraDeIncepere') as FormControl;
  }
  get dataAndOraDeIncepereNotFilledStatus() {
    return (this.dataFormControl.value === '' || this.oraDeIncepereFormControl.value === '') ? true : false;
  }
  navigateToRecurenta() {
    this.router.navigate(['calendar/recurenta']);
  }
  save(): void {

  }
  get getChoosenCabinet(): string {
    if (this.cabinetOption.length > 0) {
      const getCabinet: any = this.cabinetOption.find(
        (v) => v.cabinetUID === this.adaugaProgramareFormGroup.value.cabinet
      );
      if(typeof getCabinet !== 'undefined') {
        return getCabinet.cabinetName;
      } else {
        return '';
      }
    } else {
      return '';
    }
  }
  getCabinets() {
    this.getCabinets$ = this.reqService.get(cabinet.getCabinets)
      .subscribe(
        (d: any) => {
        this.cabinetOption = d;
        console.log(this.cabinetOption);
      });
  }
  ngOnDestroy() {
    unsubscriberHelper(this.adaugaProgramareFormGroup$);
    unsubscriberHelper(this.getCabinets$);
    unsubscriberHelper(this.getCabinetScheldules$);
  }

}
