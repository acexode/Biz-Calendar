import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { of, Subscription } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { dateDifference } from 'src/app/core/helpers/date.helper';
import { unsubscriberHelper } from 'src/app/core/helpers/unsubscriber.helper';
import { PlatformService } from 'src/app/core/services/platform/platform.service';
import { inputConfigHelper } from 'src/app/shared/data/input-config-helper';
import { IonRadioInputOption } from 'src/app/shared/models/components/ion-radio-input-option';
import { IonRadiosConfig } from 'src/app/shared/models/components/ion-radios-config';
import { inputStyleGuideConfigurations } from 'src/app/style-guide/input-config-data/input-config-data';

@Component({
  selector: 'app-recurenta',
  templateUrl: './recurenta.component.html',
  styleUrls: ['./recurenta.component.scss'],
})
export class RecurentaComponent implements OnInit, OnDestroy {
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
    seRepetaLaFiecareNumber: [2, [Validators.required]],
    seRepetaLaFiecareTimeChoose: [
      this.seRepetaLaFiecareOption[0].value,
      [Validators.required]
    ],
    incepe: ['2021-08-27', [Validators.required]],
    seTermina: [this.radioGroupOptions.pa],
    dupa: [12],
    pa: '2021-08-30',
  });
  recurendtaFormGroup$: Subscription;
  constructor(
    private pS: PlatformService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {

    this.pS.isDesktopWidth$.subscribe(
      v => this.isWed = v
    );
    // set first value
    this.setZileValue(this.seRepetaLaFiecareOption[0].value);

    this.recurendtaFormGroup$ = this.recurendtaFormGroup.valueChanges
      .pipe(distinctUntilChanged())
      .subscribe(data => {
        console.log(data);
      });
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
  add() {
    const {
      seRepetaLaFiecareNumber, // repeat times
      seRepetaLaFiecareTimeChoose, // repetition type:: dayly, weekly, monthly, yearly
      incepe, // start date
      seTermina, // end type option
      dupa, // how many times to fix it on calendar
      pa // end date
    } = this.recurendtaFormGroup.value;
    console.log(seRepetaLaFiecareNumber, seRepetaLaFiecareTimeChoose, incepe);

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

  }
  isPa(
    seRepetaLaFiecareTimeChoose: number,
    userDateInput: Date,
    pa: Date,
    occurance: number,
  ) {
    const [days, weekly, monthly, yearly] = this.seRepetaLaFiecareOption;
    // let temp: any = userDateInput;
    switch (seRepetaLaFiecareTimeChoose) {
      case days.value:
        const d = dateDifference(
          userDateInput,
          pa,
          'days'
        );
        console.log(Math.floor(d / occurance));
        break;

      case weekly.value:
        break;
      case monthly.value:
        break;
      case yearly.value:
        break;
      default:
        break;
    }
  }
  isDupa(
    seRepetaLaFiecareTimeChoose: number,
    userDateInput: Date,
    appearance: number,
    occurance: number
  ) {
    const [days, weekly, monthly, yearly] = this.seRepetaLaFiecareOption;
    let temp: any = userDateInput;
    switch (seRepetaLaFiecareTimeChoose) {
      case days.value:

        for (let index = 0;index < appearance;index++) {

          const occur = temp.setDate(temp.getDate() + occurance);
          temp = new Date(occur);
          console.log(temp);
        }
        break;

      case weekly.value:

        for (let index = 0;index < appearance;index++) {

          const occur = temp.setDate(temp.getDate() + (occurance * 7));
          temp = new Date(occur);
          console.log(temp);
        }
        break;
      case monthly.value:
        for (let index = 0;index < appearance;index++) {

          const occur = temp.setMonth(temp.getMonth() + occurance);
          temp = new Date(occur);
          console.log(temp);
        }
        break;
      case yearly.value:
        for (let index = 0;index < appearance;index++) {

          const occur = temp.setFullYear(temp.getFullYear() + occurance);
          temp = new Date(occur);
          console.log(temp);
        }
        break;
      default:
        break;
    }
  }
  ngOnDestroy() {
    unsubscriberHelper(this.recurendtaFormGroup$);
  }

}
