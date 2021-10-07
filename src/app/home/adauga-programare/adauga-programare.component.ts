import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController, ToastController } from '@ionic/angular';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
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
import { RequestService } from 'src/app/core/services/request/request.service';
import { cabinet, tipServicii } from 'src/app/core/configs/endpoints';
import { GetCabinetsModel } from 'src/app/core/models/getCabinets.service.model';
import { CabinetComponent } from 'src/app/shared/components/modal/cabinet/cabinet.component';
import { CNAS } from 'src/app/core/models/cnas.service.model';
import { Cuplata } from 'src/app/core/models/cuplata.service.model';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { Parameter, ParameterState } from 'src/app/core/models/parameter.model';
import { ToastService } from 'src/app/core/services/toast/toast.service';
@Component({
  selector: 'app-adauga-programare',
  templateUrl: './adauga-programare.component.html',
  styleUrls: ['./adauga-programare.component.scss'],
})
export class AdaugaProgramareComponent implements OnInit, OnDestroy {
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
  locatieOption: any[] = [];
  tipServiciiConfig: IonRadiosConfig = {
    mode: 'chip',
    inputLabel: {
      text: 'Tip servicii',
      classes: ''
    },
    itemClasses: 'mr-12'
  };
  tipServiciiOption: Array<IonRadioInputOption> = [
    {
      label: 'Cu plată',
      id: 'Cuplată'
    },
    {
      label: 'C.N.A.S.',
      id: 'C.N.A.S.'
    },
  ];
  tipServiciiData: Cuplata[] | CNAS[];

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
  locatie: IonSelectConfig = {
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
      idKey: 'locationUID',
      labelKey: 'locationName',
      useIcon: {
        name: 'doctor',
        classes: 'neutral-grey-medium-color'
      }
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
    tipServicii: ['', [Validators.required]],
    data: ['2021-09-27', [Validators.required]],
    oraDeIncepere: ['09:00', [Validators.required]],
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
  getLocations$: Subscription;
  getTipServices$: Subscription;
  adaugaProgramareTipServicii$: Subscription;
  tipServiciiParameterInitialData: Parameter = {
    uid: '12bdc0ba-24c0-4fbc-992f-ceb9c0230d31',
    name: 'Foloseste modulul mixt de CNAS CLN si clinica privata?',
    code: 'useMixtCLN',
    value: '',
  };
  tipServiciiParameter$: BehaviorSubject<Parameter> = new BehaviorSubject<Parameter>(
    {
   ...this.tipServiciiParameterInitialData
    }
  );
  constructor(
    private fb: FormBuilder,
    public modalController: ModalController,
    private pS: PlatformService,
    private router: Router,
    private reqService: RequestService,
    public toastController: ToastController,
    private toastService: ToastService,
    private authS: AuthService
  ) { }
  onInitializeLoadData(): void {
    /* services */
    this.getLocations();
    this.getCabinets();
    /*  */
    this.locatieFormControlProcess();
    this.getTipsOptionTypeFromParameter();
  }
  getTipsOptionTypeFromParameter(): void {
    this.authS.getParameterState()
      .subscribe(
        (v: ParameterState) => {
          if (v.parameters.length > 0) {
            const getTipsParameter = v.parameters.filter(
              (p: Parameter) => p.code === this.tipServiciiParameter$.value.code
            );
            if (getTipsParameter.length > 0) {
              this.tipServiciiParameter$.next({
                ...this.tipServiciiParameterInitialData,
                value: getTipsParameter[0].value
              });
            }
          }
        }
      );
  }

  ngOnInit(): void {
    this.onInitializeLoadData();

    this.pS.isDesktopWidth$.subscribe(
      v => this.isWed = v
    );

    this.adaugaProgramareFormGroup$ = this.adaugaProgramareFormGroup
      .get('tipprogramare').valueChanges
      .pipe(distinctUntilChanged())
      .subscribe(data => {
        this.locatieFormControlProcess(data);
      });

    this.adaugaProgramareTipServicii$ = this.adaugaProgramareFormGroup
      .get('tipServicii').valueChanges
      .pipe(distinctUntilChanged())
      .subscribe(data => {
        this.getTipServicii(data);
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
  async presentCabinetModalRadio() {
    if (this.cabinetOption.length < 1) {
      this.toastService.presentToastWithDurationDismiss('Please wait.', 'success');
      this.getCabinets(true);
    } else {
      if (!this.dataAndOraDeIncepereNotFilledStatus) {
          const toCompareDate = new Date(
          `${this.adaugaProgramareFormGroup.value.data} ${this.adaugaProgramareFormGroup.value.oraDeIncepere}`
        );
        const modal = await this.modalController.create({
          component: BizSearchableRadioModalComponent,
          cssClass: 'biz-modal-class',
          backdropDismiss: false,
          componentProps: {
            options: this.cabinetOption,
            config: this.cabinetConfig,
            toCompareDate,
          },
        });
        await modal.present();
        const { data } = await modal.onWillDismiss();
        const { dismissed, radioValue } = data;
        if (dismissed && radioValue !== '') {
          this.adaugaProgramareFormGroup.patchValue({cabinet: radioValue});
        }
      } else {
        this.toastService.presentToastWithDurationDismiss('Completează data și ora de începere de mai sus!');
      }
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
    const { data } = await modal.onWillDismiss();
    console.log(data);
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
  locatieFormControlProcess(data: string = this.locatieFormControl.value) {
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
  get locatiePlaceHolder(): string {
    return this.locatieConfigPlaceholder || '';
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
  getCabinets(callCabinetModal: boolean = false) {
    this.getCabinets$ = this.reqService.get(cabinet.getCabinets)
      .subscribe(
        (d: any) => {
          this.cabinetOption = d;
          if (callCabinetModal) {
            this.presentCabinetModalRadio();
          }
        },
        _err => this.toastService.presentToastWithDurationDismiss(
          'Unable to get available cabinet at this instance. Please check your network and try again. C01'
        )
      );
  }
  getLocations() {
    this.getLocations$ = this.reqService.get(cabinet.getCabinets)
      .subscribe(
        (d: any) => {
          console.log(d);
          this.locatieOption = d;
        },
        _err => this.toastService.presentToastWithDurationDismiss(
          'Unable to get available locations at this instance. Please check your network and try again. C02'
        )
      );
  }
  getTipServiciiType(
    type: string = this.tipServiciiOption[0].id,
    optionalData: any = {}
  ): Observable<Array<Cuplata | CNAS>> {
    switch (type) {
      case  this.tipServiciiOption[0].id:
        return this.reqService
          .post<Cuplata[]>(tipServicii.getMedicalServices, optionalData);
      case this.tipServiciiOption[1].id:
        return this.reqService
          .post<CNAS[]>(tipServicii.getClinicCNASMedicalServices, optionalData);
      default:
        return this.reqService
          .post<Cuplata[]>(tipServicii.getMedicalServices, optionalData);
    }
  }
  getTipServicii(data: string = this.tipServiciiOption[0].id) {
    let optionData =  {
      // serviceName: 'string',
      // physicianUID: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      // specialityCode: 'string',
      // locationUID: 'ec9faa71-e00a-482a-801d-520af369de85',
    };
    if (!this.isAparaturaOnLineStatus && this.locatieFormControl.value === '') {
      this.toastService
        .presentToastWithDurationDismiss(
          'Location is Required'
      );
      // clear input
      this.adaugaProgramareFormGroup.patchValue({tipServicii: ''});
    } else {
      this.toastService.presentToastWithNoDurationDismiss('Please Wait', 'success');
      if (this.locatieFormControl.value !== '') {
        optionData = {
          locationUID: this.locatieFormControl.value
        };
      }
      this.getTipServices$ = this.getTipServiciiType(data, optionData)
    .subscribe(
      (d: Cuplata[] | CNAS[]) => {
        console.log(d);
        this.tipServiciiData = d;
        this.toastService.dismissToast();
      },
      _err => this.toastService
        .presentToastWithDurationDismiss('Unable to get available locations at this instance. Please check your network and try again. C02')
    );
    }

  }
  get tipServiciiFormGroup() {
    return this.adaugaProgramareFormGroup.get('tipServicii') as FormControl;
  }
  get availbleTipServiciiOptions(): Array<IonRadioInputOption>{
    if(Number(this.tipServiciiParameter$.value.value) === 1) {
      return this.tipServiciiOption;
    } else {
      return [
        this.tipServiciiOption[0]
      ];
    }
  }
  ngOnDestroy() {
    unsubscriberHelper(this.adaugaProgramareFormGroup$);
    unsubscriberHelper(this.getCabinets$);
    unsubscriberHelper(this.getCabinetScheldules$);
    unsubscriberHelper(this.getLocations$);
    unsubscriberHelper(this.getTipServices$);
    unsubscriberHelper(this.adaugaProgramareTipServicii$);
  }

}
