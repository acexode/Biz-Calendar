import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-cabinet-notify',
  templateUrl: './cabinet-notify.component.html',
  styleUrls: ['./cabinet-notify.component.scss'],
})
export class CabinetNotifyComponent implements OnInit {

  constructor(private modalController: ModalController) { }

  ngOnInit() { }
  closeModal(v: string = '') {
    this.modalController.dismiss({
      dismissed: true,
      renita: v === 'RENUNȚĂ' ? true : false,
      veziProgram: v === 'VEZI PROGRAM' ? true : false,
    });
  }

}
