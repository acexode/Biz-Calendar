import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { inputConfigHelper } from 'src/app/shared/data/input-config-helper';
import { DemoCheckList } from 'src/app/style-guide/components/selection/selection.component';
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
  add(){}
  closeModal() {
      this.modalController.dismiss({
      dismissed: true,
      data: null
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
  async presentPacientViewModal() {
    const modal = await this.modalController.create({
      component: PacientViewModalComponent,
      cssClass: 'biz-modal-class',
      componentProps: {
        checkList: this.checkList,
      },
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    console.log(data);
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
