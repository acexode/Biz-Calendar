import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, ToastController } from '@ionic/angular';
import { RequestService } from 'src/app/core/services/request/request.service';
import { inputConfigHelper } from 'src/app/shared/data/input-config-helper';
import { IonRadioInputOption } from 'src/app/shared/models/components/ion-radio-input-option';
import { IonRadiosConfig } from 'src/app/shared/models/components/ion-radios-config';
import { IonSelectConfig } from 'src/app/shared/models/components/ion-select-config';
import { get } from 'lodash';
import { persons, location } from 'src/app/core/configs/endpoints';
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
  @Input() isEdit: boolean;
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

  judetOption = [
    {
      id: 'Alba',
      label: 'Alba'
    },
    {
      id: 'Arad',
      label: 'Arad'
    }
  ];
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
      idKey: 'id',
      labelKey: 'label',
      useIcon: {
        name: 'caret-down',
        classes: 'neutral-grey-medium-color'
      }
   };
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
  addMoreField = false; // change this later
  componentFormGroup: FormGroup = this.fb.group({
    nume: ['', [Validators.required]],
    preNume: ['', [Validators.required]],
    dateNasterii: ['', [Validators.required]],
    sex: ['', [Validators.required]],
    telephone: ['', Validators.pattern('^[0-9]*$')],
    email: ['', Validators.email],
    cnp:'',
    judet: [{value: '', disabled: true}],
    canalDePromovare: '',
    oras: [{value: '', disabled: true}],
  });
  loading = false;
  addUser$: Subscription;
  getCountries$: Subscription;
  getCities$: Subscription;
  judet$: Subscription;
  constructor(
    private fb: FormBuilder,
    private modalController: ModalController,
    private reqS: RequestService,
    public toastController: ToastController
  ) { }

  ngOnInit() {
    if (this.data) {
      console.log(this.data);
      this.componentFormGroup.patchValue(this.data);
    }
    this.judet$ = this.componentFormGroup.get('judet').valueChanges
      .pipe(
        distinctUntilChanged()
      )
      .subscribe(
        d => {
          if (d) {
            this.getCities(d);
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
  getCountries() {
    this.getCountries$ = this.reqS.post(location.getCountries, {
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
        },
        _err => this.presentToast('unable to get countries at this time. Please Check your newtwork and try again.')
      );
  }
  getCities(
    id: number = this.componentFormGroup.value.judet,
    searchString: string = '') {
    this.getCities$ = this.reqS.post(location.getCities, {
      id,
      searchString,
    })
    .subscribe(
      (d: any) => {
        this.orasOptions = d.cities.map((res: any) =>
          ({
              ...res,
              label: res.name,
        }));
        this.componentFormGroup.controls?.oras?.enable();
      },
      _err => this.presentToast('An error occur while trying to get cities at this time. Please Check your newtwork and try again.')
    );
  }
  toggleMoreField() {
    this.getCountries();
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
        cityID: get(this.data, 'cityId', null) || Number(get(this.componentFormGroup.value, 'cityId', 0)),
        genderID: Number(get(this.componentFormGroup.value, 'sex', 0)),
        isActive: true,
        wasUpdateByMobile: true,
        mobileUpdateDate:  formatRFC3339(new Date(), { fractionDigits: 3 })
      };

      let postAction: Observable<any>;
      if (this.isEdit && this.data?.uid) {
        // update
        postAction = this.reqS.post(persons.updatePerson, d);
      } else {
       postAction =  this.reqS.post(persons.addPerson, d);
      }

      this.addUser$ = postAction.subscribe(
        async _rep => {
          this.toggleLoadingState();
          // present toast and close modal
          await this.presentToast('Sucessful', 'success');
          setTimeout(() => {
            this.closeModal();
          }, 3000);
        },
        _err => {
          this.presentToast('An error occur while trying to add new person. Please try again.');
          this.toggleLoadingState();
        }
      );
    }
  }

  closeModal() {
      this.modalController.dismiss({
      dismissed: true,
      data: null
    });
  }
  get formGroupValidity() {
    return this.componentFormGroup.valid;
  }

  ngOnDestroy() {
    unsubscriberHelper(this.getCountries$);
    unsubscriberHelper(this.getCities$);
    unsubscriberHelper(this.addUser$);
    unsubscriberHelper(this.judet$);
  }

}
