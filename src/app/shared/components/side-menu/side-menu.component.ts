import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
})
export class SideMenuComponent implements OnInit {
  public appPages = [
    { title: 'Listă', url: '/home/list', icon: 'mail' },
    { title: 'Zi', url: '/home/day', icon: 'paper-plane' },
    { title: '3 zile', url: '/home/3-day', icon: 'heart' },
    { title: 'Săptămână', url: '/home/week', icon: 'archive' },
    { title: 'Lună', url: '/home/month', icon: 'trash' },
    { title: 'Comparativ', url: '/home/comparative', icon: 'warning' },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor() { }

  ngOnInit() {}

}
