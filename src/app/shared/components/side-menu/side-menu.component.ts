import { Component, Input, OnInit } from '@angular/core';
import { MenuController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
})
export class SideMenuComponent implements OnInit {
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
    { title: 'Cabinetei', url: '/calendar/cabinet', icon: 'cabinet' },
    { title: 'Aparate', url: '/calendar/aparate', icon: 'equipment' },
  ];
  public bottomNav =  [
    { title: 'Caută', url: '/calendar/cauta', icon: 'search-custom' },
    { title: 'Pacienți', url: '/calendar/pacienti', icon: 'users', chevron: false, notify:false },
    { title: 'Date statistice', url: '/calendar/pacienti', icon: 'bar-chart', chevron: true, notify:false },
    { title: 'Setări', url: '/calendar/setari', icon: 'settings-custom', chevron: false, notify:false },
    { title: 'Notificări', url: '/calendar/notificari', icon: 'notificare', chevron: false, notify:true  },
    { title: 'Ieșire', url: '/calendar/lesire', icon: 'deconectare', chevron: false, notify: false },
    { title: 'style Guide', url: '/style', icon: 'edit', chevron: false, notify: false },
    { title: 'calendar adauga-programare', url: '/calendar/adauga-programare', icon: 'edit', chevron: false, notify: false },
    // { title: 'Comparativ', url: '/calendar/comparativ', icon: 'coparativ' },
  ];
  constructor(platform: Platform, private menu: MenuController) {
    console.log(window.innerWidth);
    if (window.innerWidth >= 768) {
      this.menu.close();
    } else {
      this.isTablet = false;
    }

  }

  ngOnInit() { }

  toggleCoparative(){
    this.hideCoparative = !this.hideCoparative;
  }

}
