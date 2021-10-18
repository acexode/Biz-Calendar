import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { format } from 'date-fns';
import { InfoPatient } from 'src/app/core/models/infoPatient.model';

@Component({
  selector: 'app-info-pacient-modal',
  templateUrl: './info-pacient-modal.component.html',
  styleUrls: ['./info-pacient-modal.component.scss'],
})
export class InfoPacientModalComponent implements OnInit {
  @Input() pacientPersonData: InfoPatient;
  @Input() pacientPersonName: InfoPatient;

  constructor(private modalController: ModalController,) { }

  ngOnInit() {}
  closeModal() {
    this.modalController.dismiss({
      dismissed: true,
    });
  }
  get personAge() {
    return this.pacientPersonData?.personAge;
  }

  get personRegistrationDate() {
    return this.pacientPersonData?.lastAppointmentDate ?
      format(new Date(this.pacientPersonData?.lastAppointmentDate), 'dd.MM.yyyy') : '-';
  }

  get lastAppointmentDate() {
    return this.pacientPersonData?.personRegistrationDate
      ? format(new Date(this.pacientPersonData?.personRegistrationDate), 'dd.MM.yyyy') : '-';
  }

}
