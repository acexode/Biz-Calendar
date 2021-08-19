import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { SelectieServiciiModalComponent } from 'src/app/shared/components/modal/selectie-servicii-modal/selectie-servicii-modal.component';
import { BizCustomSelectionConfig } from 'src/app/shared/models/components/biz-custom-selection-config';
import { IonRadioInputOption } from 'src/app/shared/models/components/ion-radio-input-option';
import { IonRadiosConfig } from 'src/app/shared/models/components/ion-radios-config';
import { IonSelectConfig } from 'src/app/shared/models/components/ion-select-config';
export interface DemoCheckList {
  first: string;
  second: string;
  third: string;
  value: string;
  checked: boolean;
}

@Component({
  selector: 'app-selection',
  templateUrl: './selection.component.html',
  styleUrls: ['./selection.component.scss'],
})
export class SelectionComponent implements OnInit {
  config: IonSelectConfig = {
    inputLabel: {
      classes: '',
      text: 'label - radio',
    },
    forceListItems: false,
    multiple: false,
    disabled: false,
    placeholder: 'Selection',
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
  configB: IonSelectConfig = {
    inputLabel: {
      classes: '',
      text: 'label - checkbox',
    },
    forceListItems: false,
    multiple: true,
    disabled: false,
    placeholder: 'Selection',
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
  options = [
    {
      id: 'fcghhjhk',
      label: 'Option 1'
    },
    {
      id: 'fcghhjhkss',
      label: 'Option 2'
    }
  ];
  selectionForm: FormGroup = this.fb.group({
    select: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    filled: 'Lorem ipsum',
    focused: 'Type here',
    password: ['', Validators.required],
  });
  public checkBoxes = [
    { val: 'Checkbox off', isChecked: false, indeterminate: false, disable: false },
    { val: 'Checkbox off disabled', isChecked: false, indeterminate: false, disable: true },
    { val: 'Checkbox on', isChecked: true, indeterminate: false, disable: false },
    { val: 'Checkbox on disabled', isChecked: true, indeterminate: false, disable: true },
    { val: 'Checkbox indecised', isChecked: false, indeterminate: true, disable: false },
    { val: 'Checkbox indecised disabled', isChecked: false, indeterminate: true, disable: true }
  ];
  radioOptions: Array<IonRadioInputOption> = [
    { label: 'Sunt de acord', id: 1 },
    { label: 'Nu sunt de acord', id: 2 },
    { label: 'Nu de acord', id: 3 },
  ];
  radioConfig: IonRadiosConfig = {
    mode: 'item',
    inputLabel: {
      text: 'Radio button',
    },
    itemClasses: 'mr-12'
  };
  radioForm: FormGroup = this.fb.group({
    radio: [2, [Validators.required]],
  });
  radioConfigA: IonRadiosConfig = {
    mode: 'chip',
    inputLabel: {
      text: 'Tip servicii',
    },
    itemClasses: 'mr-12'
  };
  radioFormA: FormGroup = this.fb.group({
    radio: ['Cuplată', [Validators.required]],
  });
  radioOptionA: Array<IonRadioInputOption> = [
    { label: 'Cu plată', id: 'Cuplată' },
    { label: 'C.N.A.S.', id: 'C.N.A.S.' },
  ];

  radioConfigB: IonRadiosConfig = {
    mode: 'chip',
    inputLabel: {
      text: 'Durata (minute)',
    },
    itemClasses: 'mr-12'
  };
  radioOptionB: Array<IonRadioInputOption> = [
    { label: '15', id: '15' },
    { label: '20', id: '20' },
    { label: '30', id: '30' },
    { label: '45', id: '45' },
    { label: 'Alta', id: 'Alta' },
  ];
  checkList: DemoCheckList[] = [
    {
      first: 'Consultație peste vârsta de 4 ani',
      second: 'Servicii paraclinice',
      third: '10,80 pt.',
      value: 'Consultație',
      checked: true
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
  inputChipConfig: BizCustomSelectionConfig = {
    placeholder: 'Click',
    inputLabel: {
      text: 'Input Chip'
    }
  };
  constructor(
    private fb: FormBuilder,
    public modalController: ModalController
  ) { }

  ngOnInit() {}
  async presentModal() {
    const modal = await this.modalController.create({
      component: SelectieServiciiModalComponent,
      cssClass: 'biz-modal-class',
      componentProps: {
        checkList: this.checkList,
      },
    });
    await modal.present();
    // const { data } = await modal.onWillDismiss();
  }
  unCheckItem(data: string): void {
    if (typeof data !== null && data !== '') {
      const indexOfData = this.checkList.findIndex(
        (v: DemoCheckList) => v.value === data);
      if (indexOfData > -1) {
        this.checkList[indexOfData].checked = false;
      }
    }
  }

}
