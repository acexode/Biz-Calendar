/* eslint-disable @angular-eslint/use-lifecycle-interface */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { IonRadioInputOption } from 'src/app/shared/models/components/ion-radio-input-option';
import { IonRadiosConfig } from 'src/app/shared/models/components/ion-radios-config';
import { IonSelectConfig } from 'src/app/shared/models/components/ion-select-config';
import { TextAreaConfig } from 'src/app/shared/models/components/ion-textarea-config';
import { unsubscriberHelper } from 'src/app/core/helpers/unsubscriber.helper';
import { PlatformService } from 'src/app/core/services/platform/platform.service';
import { ionTextAreaConfigData } from '../style-guide/input-config-data/textarea-cofig-data';
import { inputConfigHelper } from '../shared/data/input-config-helper';
@Component({
  selector: 'app-nota',
  templateUrl: './nota.page.html',
  styleUrls: ['./nota.page.scss'],
})
export class NotaPage implements OnInit, OnDestroy {
  config: IonSelectConfig = {
    inputLabel: {
      classes: '',
      text: 'Tip predefinit',
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
      name: 'caret-down',
      classes: 'neutral-grey-medium-color'
    }
  };
  radioOptionB: Array<IonRadioInputOption> = [
    { label: 'Rezervare slot calendar', id: '1' },
    { label: 'Ciornă programare', id: '2' },
    { label: 'Urgență personală', id: '3' },
    { label: 'Concediu medical', id: '5' },
    { label: 'Adaugă alt titlu', id: '6' },
  ];
  textAreaConfig = {
    textAreaLabel: {
      text: 'Observații (opțional)',
      classes: '',
      slot: '',
    },
    placeholder: 'Type Here',
    disabled: false
  };

  dataInputConfig = inputConfigHelper({
    label: 'Data',
    type: 'date',
    placeholder: '08.03.2021',
    custom: {
      mode: 'md',
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
      mode: 'md',
      useIcon: {
        name: 'clock'
      }
    }
  });


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




  adaugaProgramareFormGroup$: Subscription;
  isAparaturaOnLine = false;
  adaugaProgramareFormGroup: FormGroup = this.fb.group({
    pacient: ['', [Validators.required]],
    tipprogramare: ['În-cabinet', [Validators.required]],
    locatie: new FormControl(''),
    tipServicii: '',
    tipPredefinit: '',
    time: '',
    cabinet: '',
    medic: '',
    observatii: ''
  });
  isWed = false;
  locatieConfigPlaceholder: string;
  constructor(
    private fb: FormBuilder,
    public modalController: ModalController,
    private pS: PlatformService
  ) { }

  ngOnInit() {
    this.pS.isDesktopWidth$.subscribe(
      v => this.isWed = v
    );
    console.log(this.isWed);
  }





  ngOnDestroy() {
    unsubscriberHelper(this.adaugaProgramareFormGroup$);
  }


}
