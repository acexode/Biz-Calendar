import { MenuController } from '@ionic/angular';
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
  isTablet = false;
  constructor(private router: Router, private menu: MenuController) { }

  ngOnInit() {
    this.menu.enable(false);
    this.isTablet = window.innerWidth >= 768 ? true : false;
      window.addEventListener('resize', ()=>{
        this.isTablet = window.innerWidth >= 768 ? true : false;
      });
  }
  navigate(card){
    this.router.navigate(['calendar']);
  }

}
