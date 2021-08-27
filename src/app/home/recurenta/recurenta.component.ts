import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { of, Subscription } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
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
    seTermina: [this.radioGroupOptions.dupa],
    dupa: [12],
    pa: '2021-04-08',
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
      // .pipe(distinctUntilChanged())
      .subscribe(data => {
        console.log(data);
      });
    this.add();
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
      seRepetaLaFiecareNumber,
      seRepetaLaFiecareTimeChoose,
      incepe,
      dupa
    } = this.recurendtaFormGroup.value;
    console.log(seRepetaLaFiecareNumber, seRepetaLaFiecareTimeChoose, incepe);
    const occurance = Number(seRepetaLaFiecareNumber);
    const appearance = Number(dupa);

    const userDteInput = new Date(incepe);
    let temp: any = userDteInput;
    for (let index = 0;index < appearance;index++) {

      const occur = temp.setDate( temp.getDate() + occurance);
      temp = new Date(occur);
      console.log(temp);
    }

  }
  ngOnDestroy() {
    unsubscriberHelper(this.recurendtaFormGroup$);
  }

}
