import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { InfoPacientModalComponent } from 'src/app/shared/components/modal/info-pacient-modal/info-pacient-modal.component';
import { inputConfigHelper } from 'src/app/shared/data/input-config-helper';
import { IonRadioInputOption } from 'src/app/shared/models/components/ion-radio-input-option';
import { IonRadiosConfig } from 'src/app/shared/models/components/ion-radios-config';
import { IonSelectConfig } from 'src/app/shared/models/components/ion-select-config';
import { TextAreaConfig } from 'src/app/shared/models/components/ion-textarea-config';
@Component({
  selector: 'app-adauga-programare',
  templateUrl: './adauga-programare.component.html',
  styleUrls: ['./adauga-programare.component.scss'],
})
export class AdaugaProgramareComponent implements OnInit {
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
    { label: 'În cabinet', id: 'În cabinet' },
    { label: 'On-line', id: 'On-line' },
  ];
  locatieConfig: IonSelectConfig = {
    inputLabel: {
      classes: '',
      text: 'Locație',
    },
    forceListItems: false,
    multiple: false,
    disabled: false,
    placeholder: 'Opțional',
    alertOptions: {
      cssClass: '',
    },
    idKey: 'id',
    labelKey: 'label',
    useIcon: {
      name: 'location-custom',
      classes: 'neutral-grey-medium-color'
    }
  };
  locatieOption = [
    {
      id: 'fcghhjhk',
      label: 'Option 1'
    },
    {
      id: 'fcghhjhkss',
      label: 'Option 2'
    }
  ];
  tipServiciiConfig: IonRadiosConfig = {
    mode: 'chip',
    inputLabel: {
      text: 'Tip programare',
      classes: ''
    },
    itemClasses: 'mr-12'
  };
  tipServiciiOption: Array<IonRadioInputOption> = [
    { label: 'Cu plată', id: 'Cuplată' },
    { label: 'C.N.A.S.', id: 'C.N.A.S.' },
  ];

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
  cabinetConfig: IonSelectConfig = {
    inputLabel: {
      classes: '',
      text: 'Cabinet',
    },
    forceListItems: false,
    multiple: false,
    disabled: false,
    placeholder: 'Opțional',
    alertOptions: {
      cssClass: '',
    },
    idKey: 'id',
    labelKey: 'label',
    useIcon: {
      name: 'cabinet',
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
  adaugaProgramareFormGroup: FormGroup = this.fb.group({
    pacient: ['', [Validators.required]],
    tipprogramare: ['On-line', [Validators.required]],
    locatie: ['On-line', [Validators.required]],
    tipServicii: '',
    time: '',
    cabinet: '',
    medic: '',
    observatii: ''
  });
  constructor(
    private fb: FormBuilder,
    public modalController: ModalController
  ) { }

  ngOnInit() {
    this.presentModal();
  }
  async presentModal() {
    const modal = await this.modalController.create({
      component: InfoPacientModalComponent,
      cssClass: 'biz-modal-class-type-a',
      componentProps: {
        // data:
      },
    });
    await modal.present();
    // const { data } = await modal.onWillDismiss();
  }

}
