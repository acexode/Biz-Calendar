import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, ToastController } from '@ionic/angular';
import { RequestService } from 'src/app/core/services/request/request.service';
import { inputConfigHelper } from 'src/app/shared/data/input-config-helper';
import { IonRadioInputOption } from 'src/app/shared/models/components/ion-radio-input-option';
import { IonRadiosConfig } from 'src/app/shared/models/components/ion-radios-config';
import { IonSelectConfig } from 'src/app/shared/models/components/ion-select-config';
import { get } from 'lodash';
import { persons, location, promotions } from 'src/app/core/configs/endpoints';
import { Observable, Subscription } from 'rxjs';
import { unsubscriberHelper } from 'src/app/core/helpers/unsubscriber.helper';
import { distinctUntilChanged } from 'rxjs/operators';
import { formatRFC3339 } from 'date-fns';
@Component({
  selector: 'app-new-pacient-modal',
  templateUrl: './new-pacient-modal.component.html',
  styleUrls: ['./new-pacient-modal.component.scss'],
})
export class NewPacientModalComponent implements OnInit, OnDestroy {
  @Input() data!: any;
  @Input() isEdit!: boolean;
  @Input() uid!: boolean;
  numeConfig = inputConfigHelper({
    label: 'Nume',
    type: 'text',
    placeholder: '',
  });
  preNumeConfig = inputConfigHelper({
    label: 'Prenume',
    type: 'text',
    placeholder: '',
    custom: {
      inputAssistiveText: {
        text: 'Adăugați toate prenumele pacientului!'
      }
    }
  });
  dateNasteriiConfig = inputConfigHelper({
    label: 'Data nașterii',
    type: 'date',
    placeholder: 'Alege',
    custom: {
      useIcon: {
          name: 'default',
          classes: 'neutral-grey-medium-color'
      }
    }
  });
   sexOption: Array<IonRadioInputOption> = [
    { label: 'Masculin', id: 0 },
    { label: 'Feminin', id: 1 },
  ];

  sexRadioConfig: IonRadiosConfig = {
    mode: 'chip',
    inputLabel: {
      text: 'Sex',
      classes: ''
    },
    itemClasses: 'mr-12'
  };
  telePhoneConfig = inputConfigHelper({
    label: 'Număr de telefon',
    type: 'number',
    placeholder: '',
    custom: {
      useIcon: {
          name: 'phone',
          classes: 'neutral-grey-medium-color'
      },
      // pattern: 'tel'
    }
  });
  emailConfig = inputConfigHelper({
    label: 'Email',
    type: 'email',
    placeholder: '',
    custom: {
      // pattern: 'email'
    }
  });
  cnpConfig = inputConfigHelper({
    label: 'CNP',
    type: 'number',
    placeholder: '',
    custom: {
      useIcon: {
          name: 'cnp',
          classes: 'neutral-grey-medium-color'
      }
    }
  });
   judetConfig: IonSelectConfig = {
      inputLabel: {
        classes: '',
        text: 'Județ',
      },
      forceListItems: false,
      multiple: false,
     disabled: false,
      placeholder: '',
      alertOptions: {
        cssClass: '',
      },
      idKey: 'id',
      labelKey: 'label',
      useIcon: {
        name: 'caret-down',
        classes: 'neutral-grey-medium-color'
      }
  };

  judetOption = [];
  canalDePromovareConfig: IonSelectConfig = {
      inputLabel: {
        classes: '',
        text: 'Canal de Promovare',
      },
      forceListItems: false,
      multiple: false,
     disabled: false,
      placeholder: '',
      alertOptions: {
        cssClass: '',
      },
      idKey: 'uid',
      labelKey: 'name',
      useIcon: {
        name: 'caret-down',
        classes: 'neutral-grey-medium-color'
      }
  };
  canalDePromovareOptions = [];
  orasConfig: IonSelectConfig = {
      inputLabel: {
        classes: '',
        text: 'Oraș',
      },
      forceListItems: false,
      multiple: false,
     disabled: false,
      placeholder: '',
      alertOptions: {
        cssClass: '',
      },
      idKey: 'id',
      labelKey: 'label',
      useIcon: {
        name: 'caret-down',
        classes: 'neutral-grey-medium-color'
      }
  };
  orasOptions: any;
  addMoreField = false;
  componentFormGroup: FormGroup = this.fb.group({
    nume: ['', [Validators.required]],
    preNume: ['', [Validators.required]],
    dateNasterii: ['', [Validators.required]],
    sex: ['', [Validators.required]],
    telephone: ['', Validators.pattern('^[0-9]*$')],
    email: ['', Validators.email],
    cnp:'',
    judet: [{ value: '', disabled: true }],
    oras: [{value: '', disabled: true}],
    canalDePromovare: '',
  });
  loading = false;
  addUser$: Subscription;
  getCountries$: Subscription;
  getCities$: Subscription;
  judet$: Subscription;
  personData: any;
  getPromotions$: Subscription;
  constructor(
    private fb: FormBuilder,
    private modalController: ModalController,
    private reqS: RequestService,
    public toastController: ToastController
  ) { }

  ngOnInit() {
    if (this.data) {
      this.componentFormGroup.patchValue(this.data);
      if (this.data.oras && this.data.oras !== 0) {
        this.getCitiesByCityId(this.data.oras);
      }
    }

      this.getCountries();

      this.judet$ = this.componentFormGroup.get('judet').valueChanges
      .pipe(
        distinctUntilChanged()
      )
      .subscribe(
        d => {
          if (d) {
            this.getCitiesByCountryId(d);
          }
        }
      );

  }
  async presentToast(
    message: string = 'message',
    cssClass: 'success' | 'error' = 'error',
    duration: number = 3000
  ) {
    const toast = await this.toastController.create({
      cssClass,
      message,
      duration,
    });
    toast.present();
  }
  getCountries(toUpdateCountyID: number = 0) {
    this.getCountries$ = this.reqS.post(location.getCountries,
      {
        searchString: '',
      })
      .subscribe(
        (d: any) => {
          this.judetOption = d.counties.map((res: any) =>
            ({
                ...res,
                label: res.name,
                id: res.id,
              }));
          this.componentFormGroup.controls?.judet?.enable();
          if (toUpdateCountyID) {
            this.componentFormGroup.patchValue({judet: toUpdateCountyID});
          }
        },
        _err => this.presentToast('unable to get countries at this time. Please Check your newtwork and try again.')
      );
  }
  getCitiesByCountryId(
    countyID: number = this.componentFormGroup.value.judet,
    searchString: string = ''
  ) {
    this.getCities({
      countyID,
      searchString,
    });
  }
  getCitiesByCityId(cityID: number) {
     this.getCities();
  }
  getCities(payload: any = {}) {
    this.getCities$ = this.reqS.post(location.getCities, payload)
    .subscribe(
      (d: any) => {
        this.orasOptions = d.cities.map((res: any) =>
          ({
              ...res,
              label: res.name,
        }));
        this.componentFormGroup.controls?.oras?.enable();
        if(this.judetOption.length < 1){
          this.getCountries(d?.cities?.[0].countyID);
        }
      },
      _err => this.presentToast('An error occur while trying to get cities at this time. Please Check your newtwork and try again.')
    );
  }
  toggleMoreField() {
    this.getCountries();
    this.getPromotions();
    this.addMoreField = !this.addMoreField;
  }
  toggleLoadingState() {
    this.loading = !this.loading;
  }
  add() {
    if (this.formGroupValidity) {
      this.toggleLoadingState();
      const d = {
        firstName: get(this.componentFormGroup.value, 'nume', ''),
        lastName: get(this.componentFormGroup.value, 'preNume', ''),
        pid: get(this.componentFormGroup.value, 'cnp', ''),
        birthDate: formatRFC3339(
          new Date(
            get(this.componentFormGroup.value, 'dateNasterii', new Date()
            )
          ), { fractionDigits: 3 }),
        phone: get(this.componentFormGroup.value, 'telephone', ''),
        email: get(this.componentFormGroup.value, 'email', ''),
        cityID: Number(get(this.componentFormGroup.value, 'oras', 0)),
        genderID: Number(get(this.componentFormGroup.value, 'sex', 0)),
        isActive: true,
        wasUpdateByMobile: true,
        mobileUpdateDate: formatRFC3339(new Date(), { fractionDigits: 3 }),
        // eslint-disable-next-line @typescript-eslint/naming-convention
        persons_PromotionChannel: {
          promotionChannelUID:  get(this.componentFormGroup.value, 'canalDePromovare', ''),
        }
      };
      this.personData = d;

      let postAction: Observable<any>;
      if (this.isEdit && this.uid) {
        postAction = this.reqS.put(persons.updatePerson, { ...d, uid: this.uid });
      } else {
        postAction =  this.reqS.post(persons.addPerson, d);
      }

      this.addUser$ = postAction.subscribe(
        async _rep => {
          this.toggleLoadingState();
          // present toast and close modal
          await this.presentToast('Sucessful', 'success');
          setTimeout(() => {
            if(this.isEdit){
             this.closeModal(false, true);
            }else{
              this.closeModal(true);
            }

          }, 3000);
        },
        _err => {
          console.log(_err);
          this.presentToast('An error occur while trying to add new person. Please try again.');
          this.toggleLoadingState();
        }
      );
    }
  }

  closeModal(
    isPersonCreated: boolean = false,
    isPersonUpdated: boolean = false
  ) {
      this.modalController.dismiss({
        dismissed: true,
        isPersonCreated,
        isPersonUpdated,
        data: this.personData ||= null
    });
  }
  get formGroupValidity() {
    return this.componentFormGroup.valid;
  }
   getPromotions() {
    this.getPromotions$ = this.reqS.get(promotions.getPromotionChannels)
    .subscribe(
      (d: any) => {
        this.canalDePromovareOptions = d;

      },
      // eslint-disable-next-line max-len
      _err => this.presentToast(
        'An error occur while trying to get promotions channel at this time. Please Check your newtwork and try again. C21'
      )
    );
  }

  ngOnDestroy() {
    unsubscriberHelper(this.getCountries$);
    unsubscriberHelper(this.getCities$);
    unsubscriberHelper(this.addUser$);
    unsubscriberHelper(this.judet$);
    unsubscriberHelper(this.getPromotions$);
  }

}
