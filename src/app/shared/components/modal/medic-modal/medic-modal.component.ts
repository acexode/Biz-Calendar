import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl, FormArray } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { unsubscriberHelper } from 'src/app/core/helpers/unsubscriber.helper';
import { IonInputConfig } from 'src/app/shared/models/components/ion-input-config';
import { IonSelectConfig } from 'src/app/shared/models/components/ion-select-config';
import { IonTextItem } from 'src/app/shared/models/components/ion-text-item';

export interface DemoMedicData {
  first: string;
  second: string;
  third: string;
  fourth?: string;
  fifth?: string;
  sixth?: string;
  value: string;
}

@Component({
  selector: 'app-medic-modal',
  templateUrl: './medic-modal.component.html',
  styleUrls: ['./medic-modal.component.scss'],
})
export class MedicModalComponent implements OnInit, OnDestroy {

  @Input() checkList!: any;
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
  medicData: DemoMedicData[] = [
    {
      first: 'Costantin Stefanoiu',
      second: 'Medicină generală',
      third: '276312',
      value: 'Costantin'
    },
    {
      first: 'Beniamin Pescariu',
      second: 'Medicină generală',
      third: '389712',
      value: 'Beniamin'
    },
    {
      first: 'Claudia Predoiu',
      second: 'Pneumologie',
      third: '142325',
      value: 'Claudia'
    },
    {
      first: 'Cristina Gheorghies',
      second: 'Pediatrie',
      third: '325413',
      value: 'Cristina'
    },
    {
      first: 'Mariana Romascanu Calimandriuc',
      second: 'Medicină generală',
      third: '981524',
      value: 'Mariana'
    },
    {
      first: 'Diana Dumitru',
      second: 'Psihiatrie',
      third: '123456',
      value: 'Diana'
    },
    {
      first: 'Maria Pop Postolache',
      second: 'Pediatrie',
      third: '431854',
      value: 'Maria'
    },
    {
      first: 'Cristian Andonescu',
      second: 'Pneumologie',
      third: '882155',
      value: 'Andonescu'
    },
    {
      first: 'Aneta Elena Antonesi',
      second: 'Medicină de urgență',
      third: '265512',
      value: 'Aneta'
    },
    {
      first: 'Costin Ionescu',
      second: 'Medicină de urgență',
      third: '276611',
      value: 'Costin'
    }
  ];
  medicConfig: IonSelectConfig = {
    inputLabel: {
      classes: 'd-none',
      text: 'Tip medic trimițător',
    },
    forceListItems: false,
    multiple: false,
    disabled: false,
    placeholder: 'Tip: Medici externi cu contract CNAS',
    alertOptions: {
      cssClass: '',
    },
    idKey: 'id',
    labelKey: 'label',
    useIcon: {
      name: 'chevron-down',
      classes: 'neutral-grey-medium-color'
    }
  };
  medicOption = [
    {
      id: 'Intern (din clinică)',
      label: 'Intern (din clinică)'
    },
    {
      id: 'Extern cu contract CNAS',
      label: 'Extern cu contract CNAS'
    },
    {
      id: 'Extern fără contract CNAS',
      label: 'Extern fără contract CNAS'
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
    this.list = this.medicData;
    //
    this.subscriptions.add(this.searchForm.valueChanges
      .pipe(distinctUntilChanged()) // makes sure the value has actually changed.
      .subscribe(
        data => {
          if (data.search !== '') {
            this.list = this.searching(data.search);
          } else {
            this.list = this.medicData;
          }

        }
      ));
  }
  submitForm() {
    this.isFormSubmitted = true;
    /* if (!this.ionicForm.valid) {
      console.log('Please provide all the required values!');
      return false;
    } else {
      console.log('Form Submitted', this.ionicForm.value);
    } */
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
      // ...this.ionicForm.value,
      checkboxArrayList: null
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
