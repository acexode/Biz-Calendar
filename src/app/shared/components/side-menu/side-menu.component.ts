import { Component, Input, OnInit } from '@angular/core';
import { MenuController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
})
export class SideMenuComponent implements OnInit {
  isTablet = false;
  public appPages = [
    { title: 'Listă', url: '/home/list', icon: '1-day' },
    { title: 'Zi', url: '/home/Day', icon: 'schedule' },
    { title: '3 zile', url: '/home/3-day', icon: '3-days' },
    { title: 'Săptămână', url: '/home/Week', icon: '5-days' },
    { title: 'Lună', url: '/home/Month', icon: 'month' },
    { title: 'Comparativ', url: '/home/comparative', icon: 'coparativ' },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor(platform: Platform, private menu: MenuController) {
    console.log(window.innerWidth);
    if(window.innerWidth >= 768){
      this.menu.close();
    }else{
      this.isTablet = false;
    }

  }

  ngOnInit() {}

}
