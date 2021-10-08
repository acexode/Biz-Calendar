import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-info-pacient-modal',
  templateUrl: './info-pacient-modal.component.html',
  styleUrls: ['./info-pacient-modal.component.scss'],
})
export class InfoPacientModalComponent implements OnInit {

  constructor(private modalController: ModalController,) { }

  ngOnInit() { }
  closeModal() {
    this.modalController.dismiss({
      dismissed: true,
    });
  }

}
