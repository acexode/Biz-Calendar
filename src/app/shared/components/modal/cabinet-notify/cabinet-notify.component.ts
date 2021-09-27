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
  closeModal() {
    this.modalController.dismiss({
      dismissed: true,
    });
  }

}
