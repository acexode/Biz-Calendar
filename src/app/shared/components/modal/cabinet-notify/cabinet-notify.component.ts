import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-cabinet-notify',
  templateUrl: './cabinet-notify.component.html',
  styleUrls: ['./cabinet-notify.component.scss'],
})
export class CabinetNotifyComponent implements OnInit {
  @Input() notifyType!: 'typeA' | 'typeB';
  notifyTypes: any = {
    typeA: 'cabinet notify',
    typeB: 'calendar notify',
  };

  constructor(private modalController: ModalController) { }

  ngOnInit() {}
  closeModal(v: string = '') {
    this.modalController.dismiss({
      dismissed: true,
      renita: v === 'RENUNȚĂ' ? true : false,
      veziProgram: v === 'VEZI PROGRAM' ? true : false,
      selecteaza: v === 'SELECTEAZA' ? true : false,
    });
  }
  get notifyTypeToUse() {
    if (typeof this.notifyTypes !== 'undefined') {
      switch (this.notifyType) {
        case 'typeA':
          return this.notifyTypes.typeA;
        case 'typeB':
          return this.notifyTypes.typeB;
        default:
          return this.notifyTypes.typeA;
      }
    }
  }

}
