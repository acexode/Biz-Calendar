import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { inputConfigHelper } from 'src/app/shared/data/input-config-helper';
import { DemoCheckList } from 'src/app/style-guide/components/selection/selection.component';
import { NewPacientModalComponent } from '../new-pacient-modal/new-pacient-modal.component';
import { PacientViewModalComponent } from '../pacient-view-modal/pacient-view-modal.component';
import { SelectieServiciiModalComponent } from '../selectie-servicii-modal/selectie-servicii-modal.component';

@Component({
  selector: 'app-grup-nou-modal',
  templateUrl: './grup-nou-modal.component.html',
  styleUrls: ['./grup-nou-modal.component.scss'],
})
export class GrupNouModalComponent implements OnInit {
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
  constructor(private fb: FormBuilder, private modalController: ModalController) { }

  ngOnInit() {}
  add() {
    if (this.formGroupValidity) {
      this.closeModal({
      first: this.componentFormGroup.value.numeGrup,
      second: this.checkedData.length,
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
    return this.componentFormGroup.valid && this.checkedData.length > 0;
  }
  async presentSelectModal() {
    const modal = await this.modalController.create({
      component: SelectieServiciiModalComponent,
      cssClass: 'biz-modal-class',
      componentProps: {
        checkList: this.checkList,
      },
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    console.log(data);
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
  get checkedData() {
    return this.checkList.filter((v: DemoCheckList) => v.checked === true);
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
