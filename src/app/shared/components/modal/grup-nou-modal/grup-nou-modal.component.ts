import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { BehaviorSubject, Subscription } from 'rxjs';
import { group, persons } from 'src/app/core/configs/endpoints';
import { unsubscriberHelper } from 'src/app/core/helpers/unsubscriber.helper';
import { CreateGroup } from 'src/app/core/models/createGroup.model';
import { Person } from 'src/app/core/models/person.model';
import { RequestService } from 'src/app/core/services/request/request.service';
import { ToastService } from 'src/app/core/services/toast/toast.service';
import { inputConfigHelper } from 'src/app/shared/data/input-config-helper';
import { BizSelectieServiciiConfig } from 'src/app/shared/models/components/biz-selectie-servicii.config';
import { DemoCheckList } from 'src/app/style-guide/components/selection/selection.component';
import { NewPacientModalComponent } from '../new-pacient-modal/new-pacient-modal.component';
import { PacientViewModalComponent } from '../pacient-view-modal/pacient-view-modal.component';
import { SelectieServiciiModalComponent } from '../selectie-servicii-modal/selectie-servicii-modal.component';

@Component({
  selector: 'app-grup-nou-modal',
  templateUrl: './grup-nou-modal.component.html',
  styleUrls: ['./grup-nou-modal.component.scss'],
})
export class GrupNouModalComponent implements OnInit, OnDestroy {
  checkList: DemoCheckList[] = [
    {
      first: 'Adam Abitei',
      second: 'M',
      third: '67',
      value: 'Adam Abitei',
      checked: false
    },
    {
      first: 'Alina Adam',
      second: 'F',
      third: '67',
      value: 'Alina Adam',
      checked: false
    },
    {
      first: 'Aliona Alexandru',
      second: 'F',
      third: '35',
      value: 'Aliona Alexandru',
      checked: false
    },
    {
      first: 'Paul Anton',
      second: '-',
      third: '**** *** 843',
      value: 'Paul Anton',
      checked: false
    },
    {
      first: 'Carla Aurel Ioanid',
      second: 'F',
      third: '35',
      value: 'Carla Aurel Ioanid',
      checked: false
    },
    {
      first: 'Mariana Romascanu',
      second: 'F',
      third: '47',
      value: 'Mariana Romascanu',
      checked: false
    },
    {
      first: 'Marin Voroncea',
      second: 'M',
      third: '67',
      value: 'Marin Voroncea',
      checked: false
    },
    {
      first: 'Ciprian Costescu',
      second: '-',
      third: '**** *** 843',
      value: 'Ciprian Costescu',
      checked: false
    },
    {
      first: 'Dan Preoteasa',
      second: 'M',
      third: '67',
      value: 'Dan Preoteasa',
      checked: false
    },
    {
      first: 'Mario Andrea Zanardi',
      second: '-',
      third: '**** *** 843',
      value: 'Mario Andrea Zanardi',
      checked: false
    },
    {
      first: 'Marin Voroncea',
      second: 'M',
      third: '67',
      value: 'Marin Voroncea',
      checked: false
    },
    {
      first: 'Ciprian Costescu',
      second: '-',
      third: '**** *** 843',
      value: 'Ciprian Costescu',
      checked: false
    },
  ];
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
  constructor(
    private fb: FormBuilder,
    private modalController: ModalController,
    private reqS: RequestService,
     private toastService: ToastService,
  ) { }

  ngOnInit() {
    this.getPersons();
  }
  add() {
    if (this.formGroupValidity) {
      this.closeModal({
      first: this.componentFormGroup.value.numeGrup,
      second: this.selectedValue.length,
      third: ' ',
      value: 'this.componentFormGroup.value.numeGrup',
    });
    }
  }
  closeModal(data: any = null) {
      this.modalController.dismiss({
      dismissed: true,
      data,
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
    console.log(data);
    this.selectedValue = data?.checkedValue;
  }
  async presentPacientViewModal(item: any) {
    const modal = await this.modalController.create({
      component: PacientViewModalComponent,
      cssClass: 'biz-modal-class',
      componentProps: {
        data: item,
      },
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    if (typeof data?.data !== null) {
      switch (data?.action) {
        case 'edit':
          this.presentNewPacientModal(
            {
              nume: data?.data?.first,
              preNume: 'Dummy',
              dateNasterii: '2021-08-08',
              sex: 'Feminin',
            }
          );
          break;
        case 'delete':
          this.unCheckItem(data?.data?.value);
          break;
        default:
          break;
      }
    }
  }
  async presentNewPacientModal(data: any) {
    const modal = await this.modalController.create({
      component: NewPacientModalComponent,
      cssClass: 'biz-modal-class',
      backdropDismiss: true,
      componentProps: {
        data,
      },
    });
    await modal.present();
  }
  unCheckItem(data: string): void {
    console.log(data);
    if (typeof data !== null && data !== '') {
      const indexOfData = this.selectedValue.findIndex(
        (v: any) => v === data);
      if (indexOfData > -1) {
       this.selectedValue.splice(indexOfData, 1);
      }
    }
  }
  createGroup() {
    if (this.componentFormGroup.valid) {
      const payload: CreateGroup = {
        groupName: this.componentFormGroup.value.numeGrup,
      };
      this.createGroup$ = this.reqS.post<any>(group.createGroup, payload)
        .subscribe(
          (d: any) => {
            console.log(d);
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
          console.log(d);
        },
        _err => this.toastService.presentToastWithDurationDismiss(
            'Unable to add memeber to group at this instance. Please check your network and try again. C09'
          )

      );

  }
  getPersons() {
    console.log('get persons');
    this.getPersons$ = this.reqS.post<any>(persons.getPersons, {
      searchString: '',
      // personUID: '3fa85f64-5717-4562-b3fc-2c963f66afa6'
    })
      .subscribe(
        (d: any) => {
          console.log(d);
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
