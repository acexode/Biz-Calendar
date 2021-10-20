import { NoteService } from './../../core/services/notes/note.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { addMinutes } from 'date-fns';
import { Subscription } from 'rxjs';
import { unsubscriberHelper } from 'src/app/core/helpers/unsubscriber.helper';
import { PlatformService } from 'src/app/core/services/platform/platform.service';
import { inputConfigHelper } from 'src/app/shared/data/input-config-helper';
import { IonRadioInputOption } from 'src/app/shared/models/components/ion-radio-input-option';
import { IonRadiosConfig } from 'src/app/shared/models/components/ion-radios-config';
import { IonSelectConfig } from 'src/app/shared/models/components/ion-select-config';

@Component({
  selector: 'app-add-edit-nota',
  templateUrl: './add-edit-nota.component.html',
  styleUrls: ['./add-edit-nota.component.scss'],
})
export class AddEditNotaComponent implements OnInit, OnDestroy {

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
    displayFormat: 'DD/MM/YY',
    placeholder: new Date().toLocaleDateString(),
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
    displayFormat: 'h:mm A',
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
    startTime: ['', [Validators.required]],
    tipprogramare: ['În-cabinet', [Validators.required]],
    locatie: new FormControl(''),
    tipServicii: '',
    tipPredefinit: '',
    endTime: '',
    duration: '',
    cabinet: '',
    medic: '',
    comment: ''
  });
  isWed = false;
  locatieConfigPlaceholder: string;
  constructor(
    private fb: FormBuilder,
    public modalController: ModalController,
    private pS: PlatformService,
    private noteS: NoteService
  ) { }

  ngOnInit() {
    this.pS.isDesktopWidth$.subscribe(
      v => this.isWed = v
    );
  }
  save(){
    const values = this.adaugaProgramareFormGroup.value;
    const end = new Date(values.startTime);
    // console.log()
    const value = {
      ...values,
      // endTime: addMinutes()
    };
    this.noteS.addNotes(values).subscribe(note =>{
      console.log(note);
    });
    console.log(values);
  }

  ngOnDestroy() {
    unsubscriberHelper(this.adaugaProgramareFormGroup$);
  }
}
