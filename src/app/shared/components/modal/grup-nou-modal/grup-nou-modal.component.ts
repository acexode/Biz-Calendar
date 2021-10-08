import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { format, getDate, getMonth, getYear } from 'date-fns';
import { BehaviorSubject, Subscription } from 'rxjs';
import { group, persons } from 'src/app/core/configs/endpoints';
import { unsubscriberHelper } from 'src/app/core/helpers/unsubscriber.helper';
import { CreateGroup } from 'src/app/core/models/createGroup.model';
import { Person } from 'src/app/core/models/person.model';
import { RequestService } from 'src/app/core/services/request/request.service';
import { ToastService } from 'src/app/core/services/toast/toast.service';
import { inputConfigHelper } from 'src/app/shared/data/input-config-helper';
import { BizSelectieServiciiConfig } from 'src/app/shared/models/components/biz-selectie-servicii.config';
import { NewPacientModalComponent } from '../new-pacient-modal/new-pacient-modal.component';
import { PacientViewModalComponent } from '../pacient-view-modal/pacient-view-modal.component';
import { SelectieServiciiModalComponent } from '../selectie-servicii-modal/selectie-servicii-modal.component';

@Component({
  selector: 'app-grup-nou-modal',
  templateUrl: './grup-nou-modal.component.html',
  styleUrls: ['./grup-nou-modal.component.scss'],
})
export class GrupNouModalComponent implements OnInit, OnDestroy {
  numeGrupConfig = inputConfigHelper({
    label: 'Nume grup',
    type: 'text',
    placeholder: '',
  });

  componentFormGroup: FormGroup = this.fb.group({
    numeGrup: ['', [Validators.required]],
  });
  createGroup$: Subscription;
  getPersons$: Subscription;
  personsList$: BehaviorSubject<Array<Person>> = new BehaviorSubject<Array<Person>>([]);
  selectedValue: any[] = [];
  personSelectServiciiOptionConfig: BizSelectieServiciiConfig = {
      firstKey: 'firstName',
      secondKey: 'gender',
      thirdKey: 'phone',
      idKey: 'uid'
  };
  disableAddMemberButton = true;
  loading = false;
  personsGroupUID = '';
  constructor(
    private fb: FormBuilder,
    private modalController: ModalController,
    private reqS: RequestService,
     private toastService: ToastService,
  ) { }
  toggleLoadingState() {
    this.loading = !this.loading;
  }

  ngOnInit() {
    this.getPersons();
  }
  closeModal(groupCreated: boolean = false) {
      this.modalController.dismiss({
        dismissed: true,
        groupCreated,
        data: this.personsGroupUID !== '' ? {
          groupName: this.componentFormGroup.value.numeGrup,
          personsGroupUID: this.personsGroupUID,
        } : null
    });
  }
  get formGroupValidity() {
    return this.componentFormGroup.valid && this.selectedValue.length > 0;
  }
  async presentSelectModal() {
    const modal = await this.modalController.create({
      component: SelectieServiciiModalComponent,
      cssClass: 'biz-modal-class',
      componentProps: {
        checkList: this.personsList$.value ? this.personsList$.value.map(
          (v: Person) => ({
              ...v,
              gender: v.genderID === 0 ? 'M' : 'F',
            })
        ) : [],
        config: this.personSelectServiciiOptionConfig,
        selectedValue: this.selectedValue
      },
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    this.selectedValue = data?.checkedValue;
  }
  async presentPacientViewModal(item: Person) {
    const modal = await this.modalController.create({
      component: PacientViewModalComponent,
      cssClass: 'biz-modal-class',
      componentProps: {
        data: item,
      },
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    if (data?.personData) {
      switch (data?.action) {
        case 'edit':
          this.presentNewPacientModal(data?.personData);
          break;
        case 'delete':
          this.unCheckItem(data?.personData?.uid);
          break;
        default:
          break;
      }
    }
  }
  async presentNewPacientModal(personData: any) {
    const {
        firstName,
        lastName,
        birthDate,
        genderID,
        email,
        phone,
        pid,
        cityID
    } = personData;
    const data = {
      nume: firstName,
      preNume: lastName,
      dateNasterii: format(new Date(birthDate), 'yyyy-MM-dd'),
      sex: genderID,
      telephone: Number(phone),
      email,
      cnp: pid,
      oras: cityID,
    };
    const modal = await this.modalController.create({
      component: NewPacientModalComponent,
      cssClass: 'biz-modal-class',
      backdropDismiss: true,
      componentProps: {
        data,
        isEdit: true,
      },
    });
    await modal.present();
  }
  unCheckItem(uid: string): void {
    if (typeof uid !== null && uid !== '') {
      const indexOfData = this.selectedValue.findIndex(
        (v: any) => v === uid);
      if (indexOfData > -1) {
       this.selectedValue.splice(indexOfData, 1);
      }
    }
  }
  createGroup() {
    if (this.componentFormGroup.valid) {
       this.toggleLoadingState();
      const payload: CreateGroup = {
        groupName: this.componentFormGroup.value.numeGrup,
      };
      this.createGroup$ = this.reqS.post<any>(group.createGroup, payload)
        .subscribe(
          (d: any) => {
            this.personsGroupUID = d.insertedUID;
            this.addMemberToGroup(d.insertedUID);
          },
          _err => this.toastService.presentToastWithDurationDismiss(
            'Unable to create group at this instance. Please check your network and try again. C0G'
          )

        );
    }

  }
   addMemberToGroup(personsGroupUID: string) {

    const payload: any = {
      personsGroupUID,
      personsUIDs: this.selectedValue
    };
    this.reqS.post<any>(group.addMembersToGroup, payload)
      .subscribe(
        (d: any) => {
          this.toggleLoadingState();
          this.closeModal(true);
        },
        _err => {
          this.toggleLoadingState();
          this.toastService.presentToastWithDurationDismiss(
            'Unable to add memeber to group at this instance. Please check your network and try again. C09'
          );
        }

      );

  }
  getPersons() {
    this.getPersons$ = this.reqS.post<any>(persons.getPersons, {
      searchString: '',
      // personUID: '3fa85f64-5717-4562-b3fc-2c963f66afa6'
    })
      .subscribe(
        (d: any) => {
          // enable button
          this.disableAddMemberButton = false;
          /*  */
          this.personsList$.next(
            [...d.persons]
          );
        },
        _err => {
          this.disableAddMemberButton = true;
          this.toastService.presentToastWithDurationDismiss(
            'Unable to get list of persons at this instance. Please check your network and try again. C08'
          );
        }

      );
  }
  get selectedPersons() {
    return this.personsList$.value.length > 0 ? this.personsList$.value.filter(
      (v: any) => this.selectedValue
        .includes(
          v[`${this.personSelectServiciiOptionConfig.idKey}`]
        )
    ) : [];
  }
  ngOnDestroy(): void {
    unsubscriberHelper(this.createGroup$);
    unsubscriberHelper(this.getPersons$);
  }

}
