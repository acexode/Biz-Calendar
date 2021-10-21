import { CalendarService } from './../../core/services/calendar/calendar.service';
import { Router, ActivatedRoute } from '@angular/router';
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
  noteId = null;
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
    noteTypeID: ['', [Validators.required]],
    duration: ['', [Validators.required]],
    time: ['', [Validators.required]],
    allDay: [false, [Validators.required]],
    allowOverlap: [false, [Validators.required]],
    comment: ''
  });
  isWed = false;
  locatieConfigPlaceholder: string;
  constructor(
    private fb: FormBuilder,
    public modalController: ModalController,
    private pS: PlatformService,
    private noteS: NoteService,
    private router: Router,
    private calS: CalendarService,
    private aRroute: ActivatedRoute,
  ) {
    this.noteS.getNoteTypes().subscribe((res: any) =>{
      console.log(res);
      this.radioOptionB = res.map(type =>({
        id: type.noteTypeID,
        label: type.description
      }));
    });
   }

  ngOnInit() {
    this.noteId = this.aRroute.snapshot.paramMap.get('id');
    this.calS.appointments$.subscribe(cals =>{
      const single = cals.appointments.filter(apt => apt.uid);
      console.log(single);
    });
    this.noteS.note$.subscribe(note =>{
      if(note){
        console.log(note);
        this.adaugaProgramareFormGroup.setValue({
          startTime: note?.startTime,
          noteTypeID: note?.tip,
          duration: note?.duration,
          time: note?.time,
          allDay: note?.allDay,
          allowOverlap: note?.permit,
          comment: note?.comment
        });

      }
    });
    this.formValue('allDay').valueChanges.subscribe(val =>{
      if(val === true){
        this.formValue('time').disable();
        this.formValue('time').clearValidators();

        this.formValue('duration').disable();
        this.formValue('duration').clearValidators();
        this.formValue('duration').setValue('');

        this.adaugaProgramareFormGroup.updateValueAndValidity();
        console.log(this.adaugaProgramareFormGroup.valid);
      }else{
        this.formValue('time').enable();
        this.formValue('time').setValidators([Validators.required]);
        this.formValue('duration').enable();
        this.formValue('duration').setValidators([Validators.required]);

        this.adaugaProgramareFormGroup.updateValueAndValidity();
      }
      console.log(val);
    });
    this.pS.isDesktopWidth$.subscribe(
      v => this.isWed = v
    );
  }
  save(){
    const values = this.adaugaProgramareFormGroup.value;
    const workHours = JSON.parse(localStorage.getItem('workHours'));
    const obj: any = {
      allDay: values.allDay,
      allowOverlap: values.allowOverlap,
      comment: values.comment
    };
    if(values.allDay === true){
      const start = new Date(values.startTime);
      start.setHours(workHours.appStartHour,0);
      const end = new Date(values.startTime);
      end.setHours(workHours.appEndHour,0);
      obj.startTime = start.toLocaleString();
      obj.endTime = end.toLocaleString();
    }else{
      const hour = new Date(values.time).getHours();
      const minutes = new Date(values.time).getMinutes();
      obj.startTime = new Date(new Date(values.startTime).setHours(hour, minutes)).toLocaleString();
      obj.endTime = values.duration ? addMinutes(new Date(obj.startTime), values.duration).toLocaleString() : '';
    }
    console.log(obj);
    if(this.noteId){
      this.noteS.updateNotes(this.noteId, values).subscribe(note =>{
        console.log(note);
        // this.dismiss();
      });

    }else{
      this.noteS.addNotes(obj).subscribe(note =>{
        console.log(note);
        // this.dismiss();
      });
    }
  }
  formValue(field){
    return this.adaugaProgramareFormGroup.get(field);
  }
  dismiss(){
    this.router.navigate(['..']);
  }
  ngOnDestroy() {
    unsubscriberHelper(this.adaugaProgramareFormGroup$);
  }
}
