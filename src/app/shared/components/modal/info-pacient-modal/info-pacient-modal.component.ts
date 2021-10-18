import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { InfoPatient } from 'src/app/core/models/infoPatient.model';

@Component({
  selector: 'app-info-pacient-modal',
  templateUrl: './info-pacient-modal.component.html',
  styleUrls: ['./info-pacient-modal.component.scss'],
})
export class InfoPacientModalComponent implements OnInit {
  @Input() pacientPersonData: InfoPatient;

  constructor(private modalController: ModalController,) { }

  ngOnInit() {
    console.log(this.pacientPersonData);
  }
  closeModal() {
    this.modalController.dismiss({
      dismissed: true,
    });
  }
  get personAge() {
    return this.pacientPersonData?.personAge;
  }

}
