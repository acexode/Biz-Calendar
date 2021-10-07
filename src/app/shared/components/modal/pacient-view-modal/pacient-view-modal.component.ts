import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Person } from 'src/app/core/models/person.model';

@Component({
  selector: 'app-pacient-view-modal',
  templateUrl: './pacient-view-modal.component.html',
  styleUrls: ['./pacient-view-modal.component.scss'],
})
export class PacientViewModalComponent implements OnInit {
  @Input() data!: Person;

  constructor( private modalController: ModalController) { }
  ngOnInit() { }
  closeModal(closeStatus: boolean = false, action: string = '') {
      this.modalController.dismiss({
        dismissed: true,
        data: closeStatus ? this.data : null,
        action,
    });
  }

}
