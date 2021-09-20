import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { RequestService } from 'src/app/core/services/request/request.service';
import { inputConfigHelper } from 'src/app/shared/data/input-config-helper';
import { IonRadioInputOption } from 'src/app/shared/models/components/ion-radio-input-option';
import { IonRadiosConfig } from 'src/app/shared/models/components/ion-radios-config';
import { IonSelectConfig } from 'src/app/shared/models/components/ion-select-config';
import { get } from 'lodash';
import { persons, location } from 'src/app/core/configs/endpoints';
import { Subscription } from 'rxjs';
import { unsubscriberHelper } from 'src/app/core/helpers/unsubscriber.helper';
import { distinctUntilChanged } from 'rxjs/operators';
@Component({
  selector: 'app-new-pacient-modal',
  templateUrl: './new-pacient-modal.component.html',
  styleUrls: ['./new-pacient-modal.component.scss'],
})
export class NewPacientModalComponent implements OnInit, OnDestroy {
  @Input() data!: any;
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
    type: 'text',
    placeholder: '',
    custom: {
      useIcon: {
          name: 'phone',
          classes: 'neutral-grey-medium-color'
      }
    }
  });
  emailConfig = inputConfigHelper({
    label: 'Email',
    type: 'email',
    placeholder: '',
  });
  cnpConfig = inputConfigHelper({
    label: 'CNP',
    type: 'text',
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
  addMoreField = false;
  componentFormGroup: FormGroup = this.fb.group({
    nume: ['', [Validators.required]],
    preNume: ['', [Validators.required]],
    dateNasterii: ['', [Validators.required]],
    sex: ['', [Validators.required]],
    telephone: '',
    email: '',
    cnp:'',
    judet: [{value: '', disabled: true}, Validators.required],
    canalDePromovare: '',
    oras: [{value: '', disabled: true}, Validators.required],
  });
  loading = false;
  addUser$: Subscription;
  getCountries$: Subscription;
  getCities$: Subscription;
  constructor(
    private fb: FormBuilder,
    private modalController: ModalController,
    private reqS: RequestService
  ) { }

  ngOnInit() {
    if (this.data) {
      this.componentFormGroup.patchValue(this.data);
    }
    this.componentFormGroup.get('judet').valueChanges
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
          console.log(this.judetOption);
          this.componentFormGroup.controls?.judet?.enable();
        },
        err => console.log(err)
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
      err => console.log(err)
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
        phone: get(this.componentFormGroup.value, 'telephone', ''),
        cityID: Number(get(this.componentFormGroup.value, 'cityId', 0)),
        genderID: Number(get(this.componentFormGroup.value, 'sex', 0)),
        passWarnnings: true
      };
      this.addUser$ = this.reqS.post(persons.addPerson, d).subscribe(
        _rep => {
          this.toggleLoadingState();
          this.closeModal();
        },
        err => {
          console.log(err);
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
    unsubscriberHelper(this.addUser$);
  }

}
