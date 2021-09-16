import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-pacient-view-modal',
  templateUrl: './pacient-view-modal.component.html',
  styleUrls: ['./pacient-view-modal.component.scss'],
})
export class PacientViewModalComponent implements OnInit {

  constructor( private modalController: ModalController) { }

  ngOnInit() { }
  closeModal() {
      this.modalController.dismiss({
      dismissed: true,
      data: null
    });
  }

}
