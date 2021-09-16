import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-pacient-view-modal',
  templateUrl: './pacient-view-modal.component.html',
  styleUrls: ['./pacient-view-modal.component.scss'],
})
export class PacientViewModalComponent implements OnInit {
  @Input() data!: any;

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
