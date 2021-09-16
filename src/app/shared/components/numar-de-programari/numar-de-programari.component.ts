import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-numar-de-programari',
  templateUrl: './numar-de-programari.component.html',
  styleUrls: ['./numar-de-programari.component.scss'],
})
export class NumarDeProgramariComponent implements OnInit {

  @Input() list;

  constructor(private modalController: ModalController) { }

  ngOnInit() {}

  selectItem(item){
    this.modalController.dismiss(item);
  }

}
