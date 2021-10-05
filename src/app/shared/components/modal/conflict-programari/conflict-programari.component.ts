import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-conflict-programari',
  templateUrl: './conflict-programari.component.html',
  styleUrls: ['./conflict-programari.component.scss'],
})
export class ConflictProgramariComponent implements OnInit {

  constructor(private modalController: ModalController) { }

  ngOnInit() { }
   dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      dismissed: true,
    });
  }

}
