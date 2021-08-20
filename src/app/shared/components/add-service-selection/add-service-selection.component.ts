import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DemoCheckList } from 'src/app/style-guide/components/selection/selection.component';
import { SelectieServiciiModalComponent } from '../modal/selectie-servicii-modal/selectie-servicii-modal.component';

@Component({
  selector: 'app-add-service-selection',
  templateUrl: './add-service-selection.component.html',
  styleUrls: ['./add-service-selection.component.scss'],
})
export class AddServiceSelectionComponent implements OnInit {
  checkList: DemoCheckList[] = [
    {
      first: 'Consultație peste vârsta de 4 ani',
      second: 'Servicii paraclinice',
      third: '10,80 pt.',
      fourth: '1x Consult control pneumologie',
      fifth: '80 lei',
      sixth: 'Numerar/card în clinică',
      value: 'Consultație',
      checked: false
    },
    {
      first: 'Ecografie generală (abdomen + pelvis)',
      second: 'Servicii paraclinice',
      third: '23,45 pt.',
      fourth: '1x Endoscopie digestivă superioară - interpretare și stabilire tratament (urgență)',
      fifth: '350 lei',
      sixth: 'Printr-o companie de asigurări',
      value: 'Ecografie generală',
      checked: false
    },
    {
      first: 'Ecografie abdominală',
      second: 'Servicii paraclinice',
      third: '12,34 pt.',
      fourth: '1x Consult control pneumologie',
      fifth: '80 lei',
      sixth: 'Numerar/card în clinică',
      value: 'Ecografie abdominală',
      checked: false
    },
    {
      first: 'EKG standard',
      second: 'Servicii paraclinice',
      third: '12,34 pt.',
      fourth: '1x Consult control pneumologie',
      fifth: '80 lei',
      sixth: 'Numerar/card în clinică',
      value: 'EKG',
      checked: false
    },
    {
      first: 'Consult peste 4 ani',
      second: 'Consultație',
      third: '5 pt.',
      fourth: '1x Consult control pneumologie',
      fifth: '80 lei',
      sixth: 'Numerar/card în clinică',
      value: 'Consult',
      checked: false
    },
    {
      first: 'Spirometrie',
      second: 'Servicii paraclinice',
      third: '23 pt.',
      fourth: '2x Spirometrie',
      fifth: '2x 120 lei',
      sixth: 'Pachet servicii',
      value: 'Spirometrie',
      checked: false
    },
    {
      first: 'Pulsoximetrie',
      second: 'Servicii paraclinice',
      third: '10 pt.',
      fourth: '1x Consult control pneumologie',
      fifth: '80 lei',
      sixth: 'Numerar/card în clinică',
      value: 'Pulsoximetrie',
      checked: false
    },
  ];

  constructor(public modalController: ModalController) { }

  ngOnInit() { }
  async presentModal() {
    const modal = await this.modalController.create({
      component: SelectieServiciiModalComponent,
      cssClass: 'biz-modal-class',
      componentProps: {
        checkList: this.checkList,
      },
    });
    await modal.present();
    /* const { data } = await modal.onWillDismiss();
    console.log(data, this.checkList); */
  }
  get filtercustomComponentData() {
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
