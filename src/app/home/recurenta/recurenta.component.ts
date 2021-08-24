import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
export class RecurentaComponent implements OnInit {
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
    { label: 'zile', value: 'zile' },
    { label: 'săptămâni', value: 'săptămâni' },
    { label: 'luni', value: 'luni' },
    { label: 'ani?', value: 'ani?' },
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
  isWed = false;
  dropDownStatus = false;
  recurendtaFormGroup: FormGroup = this.fb.group({
    seRepetaLaFiecare: [2, [Validators.required]],
    zile: '',
    dupa: [12],
    pe: '08-04-2021',
  });
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
  }
  toggleDropDown() {
    this.dropDownStatus = !this.dropDownStatus;
  }
  get isDropDown() {
    return this.dropDownStatus;
  }
  get zileFormControl() {
    return this.recurendtaFormGroup.get('zile');
  }
  get zileFormControlValue() {
    return this.zileFormControl.value;
  }
  setZileValue(data: string) {
    this.zileFormControl.setValue(data);
  }
  setZileValueAndToggle(data: string) {
    this.setZileValue(data);
    // toggle
    this.toggleDropDown();
  }

}
