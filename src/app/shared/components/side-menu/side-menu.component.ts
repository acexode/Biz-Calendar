import { Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { MenuController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
})
export class SideMenuComponent implements OnInit {
  public currentVersion: string = require('../../../../assets/version.json').version;
  isTablet = false;
  hideSideMenu = false;
  hideCoparative = false;
  public appPages =  [
    { title: 'Listă', url: '/calendar/lista', icon: '1-day' },
    { title: 'Zi', url: '/calendar/zi', icon: 'schedule' },
    { title: 'Zile lucratoare', url: '/calendar/zile-lucratoare', icon: '3-days' },
    { title: 'Săptămână', url: '/calendar/saptamana', icon: '5-days' },
    { title: 'Lună', url: '/calendar/luna', icon: 'month' },
    // { title: 'Comparativ', url: '/calendar/comparativ', icon: 'coparativ' },
  ];
  public comparative =  [
    { title: 'Utilizatori', url: '/calendar/utilizatori', icon: 'users' },
    { title: 'Cabinete', url: '/calendar/cabinet', icon: 'cabinet' },
    { title: 'Aparate', url: '/calendar/aparate', icon: 'equipment' },
  ];
  public bottomNav =  [
    { title: 'Caută', url: '/calendar/cauta', icon: 'search-custom' },
    { title: 'Pacienți', url: '/calendar/pacienti', icon: 'users', chevron: false, notify:false },
    { title: 'Date statistice', url: '/data-statistice', icon: 'bar-chart', chevron: true, notify:false },
    { title: 'Setări', url: '/calendar/setari', icon: 'settings-custom', chevron: false, notify:false },
    { title: 'Notificări', url: '/calendar/notificari', icon: 'notificare', chevron: false, notify:true  },
    { title: 'style Guide', url: '/style', icon: 'edit', chevron: false, notify: false },
    { title: 'calendar adauga-programare', url: '/calendar/adauga-programare', icon: 'edit', chevron: false, notify: false },
    { title: 'recurenta', url: '/calendar/recurenta', icon: 'edit', chevron: false, notify: false },
    { title: 'vizualiare-programare', url: '/vizualiare/programare/2', icon: 'edit', chevron: false, notify: false },
    // { title: 'Comparativ', url: '/calendar/comparativ', icon: 'coparativ' },
  ];
  constructor(platform: Platform, private menu: MenuController, private router: Router) {
    this.isTablet = window.innerWidth >= 768 ? true : false;
    window.addEventListener('resize', ()=>{
      if (window.innerWidth >= 768) {
        // this.menu.close();
        this.isTablet = true;
      } else {
        this.isTablet = false;
      }
    });


  }

  ngOnInit() { }

  logout(){
    localStorage.clear();
    this.router.navigate(['/login']);

  }

  toggleCoparative(){
    console.log(this.hideCoparative);
    this.hideCoparative = !this.hideCoparative;
  }

}
