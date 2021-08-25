import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-selectie-spatiu',
  templateUrl: './selectie-spatiu.page.html',
  styleUrls: ['./selectie-spatiu.page.scss'],
})
export class SelectieSpatiuPage implements OnInit {
  cards = [
    {
      title: 'Mediplus Clinic',
      img: 'assets/icon/mediplus.png',
    },
    {
      title: 'Clinica Digestmed',
      img: 'assets/icon/digestmed.png',
    },
    {
      title: 'Centrul Medical Bellanima',
      img: 'assets/icon/bellanima.png',
    }
  ];
  constructor(private router: Router) { }

  ngOnInit() {
  }
  navigate(card){
    this.router.navigate(['calendar']);
  }

}
