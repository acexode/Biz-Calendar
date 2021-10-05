import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { of, Subscription } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { dateDifference, getDateInYearMonthDay } from 'src/app/core/helpers/date.helper';
import { unsubscriberHelper } from 'src/app/core/helpers/unsubscriber.helper';
import { PlatformService } from 'src/app/core/services/platform/platform.service';
import { inputConfigHelper } from 'src/app/shared/data/input-config-helper';
import { IonRadioInputOption } from 'src/app/shared/models/components/ion-radio-input-option';
import { IonRadiosConfig } from 'src/app/shared/models/components/ion-radios-config';
import { inputStyleGuideConfigurations } from 'src/app/style-guide/input-config-data/input-config-data';
import { RecurentaService } from './services/recurenta.service';

@Component({
  selector: 'app-recurenta',
  templateUrl: './recurenta.component.html',
  styleUrls: ['./recurenta.component.scss'],
})
export class RecurentaComponent implements OnInit, OnDestroy {
  @Input() isModal!: boolean;
  inputStyleGuide = inputStyleGuideConfigurations;
  seRepetaLaFiecareInputConfig = inputConfigHelper({
    label: '',
    type: 'number',
    placeholder: '',
    custom: {
      spinnerConfig: {
        textAlign: true
      }
    }
  });
  seRepetaLaFiecareOption: any = [
    { label: 'zile', value: 'days' },
    { label: 'săptămâni', value: 'weekly' },
    { label: 'luni', value: 'monthly' },
    { label: 'ani?', value: 'yearly' },
  ];
  dataInputConfig = inputConfigHelper({
    label: 'Începe',
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
    label: '',
    type: 'time',
    placeholder: '09:00',
    custom: {
      mode: 'ios',
    }
  });
  timeBInputConfig = inputConfigHelper({
    label: '',
    type: 'time',
    placeholder: '09:00',
    custom: {
      mode: 'ios',
      useIcon: {
        name: 'clock'
      }
    }
  });
  dupaInputConfig = inputConfigHelper({
    label: '',
    type: 'number',
    placeholder: 'Type Here',
    custom: {
      mode: 'ios',
      spinnerConfig: {
        textAlign: true
      }
    }
  });
  paInputConfig = inputConfigHelper({
    label: '',
    type: 'date',
    placeholder: '08.03.2021',
    custom: {
      mode: 'ios',
      useIcon: {
        name: 'default'
      }
    }
  });
  radioGroupOptions = {
    dupa: 'dupa',
    pa: 'pa'
  };
  isWed = false;
  dropDownStatus = false;
  recurendtaFormGroup: FormGroup = this.fb.group({
    seRepetaLaFiecareNumber: [1, [Validators.required]],
    seRepetaLaFiecareTimeChoose: ['', [Validators.required]
    ],
    incepe: ['', [Validators.required]], // 2021-08-27
    seTermina: [this.radioGroupOptions.pa],
    dupa: [0, [Validators.required]],
    pa: ['', [Validators.required]],
    lunaRadio: ''
  });
  recurendtaFormGroup$: Subscription;
  dupaInputChanges$: Subscription;
  paInputChamges$: Subscription;
  dateList = [
    {
      label: 'L',
      selected: false,
      value: 'L'
    },
    {
      label: 'M',
      selected: false,
      value: 'M'
    },
    {
      label: 'M',
      selected: false,
       value: 'm'
    },
    {
      label: 'J',
      selected: false,
       value: 'J'
    },
    {
      label: 'V',
      selected: false,
       value: 'V'
    },
    {
      label: 'S',
      selected: false,
       value: 'S'
    },
    {
      label: 'D',
      selected: false,
       value: 'D'
    }
  ];
  lunaRadioConfig: IonRadiosConfig = {
    mode: 'item',
    inputLabel: {
      text: 'Se repetă lunar',
    },
    itemClasses: 'mr-12'
  };
  lunaRadioOption: Array<IonRadioInputOption> = [
    { label: 'în data de 8 a lunii', id: '15' },
    { label: 'a doua zi de luni din lună', id: '20' },
  ];
  constructor(
    private pS: PlatformService,
    private fb: FormBuilder,
    private rS: RecurentaService,
    private router: Router,
    private modalController: ModalController
  ) { }

  ngOnInit() {

    this.pS.isDesktopWidth$.subscribe(
      v => this.isWed = v
    );
    // set first value
    this.setZileValue(this.seRepetaLaFiecareOption[0].label);

    this.dupaInputChanges$ = this.recurendtaFormGroup.get('dupa').valueChanges
      .pipe(distinctUntilChanged())
      .subscribe(
        _d => {
          this.compute();
        }
      );
    this.paInputChamges$ = this.recurendtaFormGroup.get('pa').valueChanges
      .pipe(distinctUntilChanged())
      .subscribe(
        _d => {
          this.compute();
        }
      );
  }
  toggleDropDown() {
    this.dropDownStatus = !this.dropDownStatus;
  }
  get isDropDown() {
    return this.dropDownStatus;
  }
  get timeChooseFormControl() {
    return this.recurendtaFormGroup.get('seRepetaLaFiecareTimeChoose');
  }
  get zileFormControlValue() {
    return this.timeChooseFormControl.value;
  }
  setZileValue(data: string) {
    this.timeChooseFormControl.setValue(data);
  }
  setZileValueAndToggle(data: string) {
    this.setZileValue(data);
    // toggle
    this.toggleDropDown();
  }
  compute() {
    const {
      seRepetaLaFiecareNumber, // repeat times
      seRepetaLaFiecareTimeChoose, // repetition type:: dayly, weekly, monthly, yearly
      incepe, // start date
      seTermina, // end type option
      dupa, // how many times to fix it on calendar
      pa // end date
    } = this.recurendtaFormGroup.value;

    const occurance = Number(seRepetaLaFiecareNumber);

    const userDateInput = new Date(incepe);

    switch (seTermina) {
      case this.radioGroupOptions.dupa:
        this.isDupa(
          seRepetaLaFiecareTimeChoose,
          userDateInput,
          Number(dupa),
          occurance
        );
        break;
      case this.radioGroupOptions.pa:
        this.isPa(
          seRepetaLaFiecareTimeChoose,
          userDateInput,
          pa,
          occurance
        );
        break;
      default:
        break;
    }
    this.updateRecurentaServiceData();
  }
  isPa(
    seRepetaLaFiecareTimeChoose: string,
    userDateInput: Date,
    pa: Date,
    occurance: number,
  ) {
    const [days, weekly, monthly, yearly] = this.seRepetaLaFiecareOption;
    // let temp: any = userDateInput;
    let timeType = 'days';
    switch (seRepetaLaFiecareTimeChoose) {
      case days.label:
        timeType = 'days';
        break;
      case weekly.label:
        timeType = 'weeks';
        break;
      case monthly.label:
        timeType = 'months';
        break;
      case yearly.label:
        timeType = 'years';
        break;
      default:
        break;
    }
    const diff = dateDifference(
      userDateInput,
      pa,
      timeType
    );
    this.setDupa(Math.floor(diff / occurance));
  }
  isDupa(
    seRepetaLaFiecareTimeChoose: string,
    userDateInput: Date,
    appearance: number,
    occurance: number
  ) {
    const [days, weekly, monthly, yearly] = this.seRepetaLaFiecareOption;
    let temp: any = userDateInput;
    switch (seRepetaLaFiecareTimeChoose) {
      case days.label:
        for (let index = 0;index < appearance;index++) {
          const occur = temp.setDate(temp.getDate() + occurance);
          temp = new Date(occur);
        }
        break;
      case weekly.label:
        for (let index = 0;index < appearance;index++) {
          const occur = temp.setDate(temp.getDate() + (occurance * 7));
          temp = new Date(occur);
        }
        break;
      case monthly.label:
        for (let index = 0;index < appearance;index++) {
          const occur = temp.setMonth(temp.getMonth() + occurance);
          temp = new Date(occur);
        }
        break;
      case yearly.label:
        for (let index = 0;index < appearance;index++) {
          const occur = temp.setFullYear(temp.getFullYear() + occurance);
          temp = new Date(occur);
        }
        break;
      default:
        break;
    }
    this.setPa(getDateInYearMonthDay(temp));
  }
  setDupa(data: number) {
    const d = data > 0 ? data : 0;
    this.recurendtaFormGroup.get('dupa').patchValue(d);
  }
  setPa(data: any) {
    this.recurendtaFormGroup.get('pa').patchValue(data);
  }
  updateRecurentaServiceData() {
    if (this.isModal) {

    } else {
      this.rS.updateRecurenta({ ...this.recurendtaFormGroup.value });
    }

  }
  navigateToRecurenta() {
    this.router.navigate(['calendar/adauga-programare']);
  }
  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      dismissed: true,
      recurentaData: this.recurendtaFormGroup.value
    });
  }
  backAction(): void {
    if (this.isModal) {
      this.dismiss();
    } else {
      this.navigateToRecurenta();
    }
  }
  computeAndNavigate() {
    this.compute();
    this.backAction();
  }
  toggleRadio(item: any) {
    const d = this.dateList.find(x => x.value === item.value);
    if (typeof d !== 'undefined') {
      d.selected = !d.selected;
    }
  }
  ngOnDestroy() {
    unsubscriberHelper(this.recurendtaFormGroup$);
    unsubscriberHelper(this.dupaInputChanges$);
    unsubscriberHelper(this.paInputChamges$);
  }

}
