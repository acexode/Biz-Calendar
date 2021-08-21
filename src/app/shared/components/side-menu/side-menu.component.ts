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
  public appPages = [
    { title: 'Listă', url: '/calendar/lista', icon: '1-day' },
    { title: 'Zi', url: '/calendar/zi', icon: 'schedule' },
    { title: 'Zile lucratoare', url: '/calendar/zile-lucratoare', icon: '3-days' },
    { title: 'Săptămână', url: '/calendar/saptamana', icon: '5-days' },
    { title: 'Lună', url: '/calendar/luna', icon: 'month' },
    { title: 'Comparativ', url: '/calendar/comparativ', icon: 'coparativ' },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor(platform: Platform, private menu: MenuController) {
    console.log(window.innerWidth);
    if (window.innerWidth >= 768) {
      this.menu.close();
    } else {
      this.isTablet = false;
    }

  }

  ngOnInit() { }

}
