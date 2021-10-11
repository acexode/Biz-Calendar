import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { BehaviorSubject, Subscription } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { group, persons } from 'src/app/core/configs/endpoints';
import { unsubscriberHelper } from 'src/app/core/helpers/unsubscriber.helper';
import { GroupList } from 'src/app/core/models/groupList.model';
import { Person } from 'src/app/core/models/person.model';
import { RequestService } from 'src/app/core/services/request/request.service';
import { ToastService } from 'src/app/core/services/toast/toast.service';
import { IonInputConfig } from 'src/app/shared/models/components/ion-input-config';
import { IonTextItem } from 'src/app/shared/models/components/ion-text-item';
import { GrupNouModalComponent } from '../grup-nou-modal/grup-nou-modal.component';
import { NewPacientModalComponent } from '../new-pacient-modal/new-pacient-modal.component';


export interface DemoPatientData {
  first: string;
  second: string;
  third: string;
  fourth?: string;
  fifth?: string;
  sixth?: string;
  value: string;
  list?: Array<any>;
}


@Component({
  selector: 'app-pacient',
  templateUrl: './pacient.component.html',
  styleUrls: ['./pacient.component.scss'],
})
export class PacientComponent implements OnInit, OnDestroy {
  segment = {
    one: 'Pacienți',
    two: 'Grupuri'
  };
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
    hidAssistiveText: true,
  };
  searchForm: FormGroup = this.fb.group({
    search: ['', [Validators.required]],
  });
  public subscriptions = new Subscription();
  componentFormGroup: FormGroup = this.fb.group({
    medicOptionTip: ['', [Validators.required]],
    optionValue: ['', [Validators.required]],
  });
  currentSegement: any = this.segment.one;
  getPersons$: Subscription;
  personsList$: BehaviorSubject<Array<Person>> = new BehaviorSubject<Array<Person>>([]);
  groupList$: BehaviorSubject<Array<GroupList>> = new BehaviorSubject<Array<GroupList>>([]);
  list$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  getGroups$: Subscription;
  isFetchingGroups = true;
  isFetchingPerson = true;
  constructor(
    private fb: FormBuilder,
    private modalController: ModalController,
    private reqS: RequestService,
    private toastService: ToastService,
  ) {
  }
  async presentPacientnew() {
    const modal = await this.modalController.create({
      component: NewPacientModalComponent,
      cssClass: 'biz-modal-class',
      backdropDismiss: false,
      componentProps: {},
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
     if (data?.dismissed && data?.isPersonCreated) {
       this.currentSegement = this.segment.one;
       this.isFetchingPerson = true;
       this.getPersons();
     }
  }
   async presentGrupNouModal() {
    const modal = await this.modalController.create({
      component: GrupNouModalComponent,
      cssClass: 'biz-modal-class',
      backdropDismiss: false,
      componentProps: {},
    });
    await modal.present();
     const { data } = await modal.onWillDismiss();
     if (data?.dismissed && data?.groupCreated) {
       this.currentSegement = this.segment.two;
       this.isFetchingGroups = true;
       this.getGroups();
     }
  }
  ngOnInit(): void {
    // load GetPersons
    this.getPersons();
    // get groups
    this.getGroups();
    // load check list to list
    this.updateData();
    //
    this.subscriptions.add(this.searchForm.valueChanges
      .pipe(distinctUntilChanged()) // makes sure the value has actually changed.
      .subscribe(
        data => {
          if (data.search !== '') {
           this.list$.next([...this.searching(data.search)]);
          } else {
            this.updateData();
          }
        }
      ));
  }
  updateData(data: any = this.currentSegement) {
    switch (data) {
      case this.segment.one:
        if (this.personsList$.value.length > 0) {
          this.list$.next(
            [...this.personsList$.value]
          );
        }
        break;
      case this.segment.two:
        if (this.groupList$.value.length > 0) {
          this.list$.next(
            [...this.groupList$.value]
          );
        }
        break;
      default:
        if (this.personsList$.value.length > 0) {
          this.list$.next(
            [...this.personsList$.value]
          );
        }
    }
  }
  segmentChanged(ev: any) {
    this.currentSegement = ev?.detail?.value || '';
    this.updateData();
  }
  get segmentToShow() {
     return this.currentSegement;
  }
  submit(data: any) {
    this.modalController.dismiss({
      dismissed: true,
      data,
      isPerson: this.currentSegement === this.segment.one,
      isGroup: this.currentSegement === this.segment.two,
    });
  }
  closeModal() {
    this.modalController.dismiss({
      dismissed: true,
      data: null
    });
  }
  searching(st: string) {
    switch (this.currentSegement) {
      case this.segment.one:
        return this.list$.value
          .filter((v: any) =>
            (v.firstName.toLowerCase().indexOf(st.toLowerCase()) > -1) ||
            (v.lastName.toLowerCase().indexOf(st.toLowerCase()) > -1)
          );
      case this.segment.two:
        return this.list$.value
          .filter((v: any) => (v.groupName.toLowerCase().indexOf(st.toLowerCase()) > -1));
      default:
        this.updateData();
    }
  }
  getPersons() {
    this.getPersons$ = this.reqS.post<any>(persons.getPersons, {
      searchString: '',
      // personUID: '3fa85f64-5717-4562-b3fc-2c963f66afa6'
    })
      .subscribe(
        (d: any) => {
          this.personsList$.next(
            [...d.persons]
          );
          if (this.currentSegement === this.segment.one) {
            // call update
           this.updateData();
          }
          this.isFetchingPerson = false;
        },
        _err => {
          this.toastService.presentToastWithDurationDismiss(
            'Unable to get persons at this instance. Please check your network and try again. C06'
          );
          this.isFetchingPerson = false;
        }

      );
  }
  getGroups() {
    this.getGroups$ = this.reqS.get<any>(group.getGroups)
      .subscribe(
        (d: GroupList[]) => {
          this.groupList$.next(
            [...d]
          );
          if (this.currentSegement === this.segment.two) {
            // call update
           this.updateData();
          }
          this.isFetchingGroups = false;
        },
        _err => {
          this.toastService.presentToastWithDurationDismiss(
            'Unable to get group at this instance. Please check your network and try again. C07'
          );
          this.isFetchingGroups = false;
        }

      );
  }
  ngOnDestroy(): void {
    unsubscriberHelper(this.subscriptions);
    unsubscriberHelper(this.getPersons$);
    unsubscriberHelper(this.getGroups$);
  }

}
