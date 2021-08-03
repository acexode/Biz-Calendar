import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
})
export class SideMenuComponent implements OnInit {
  public appPages = [
    { title: 'Inbox', url: '/home/Inbox', icon: 'mail' },
    { title: 'Outbox', url: '/home/Outbox', icon: 'paper-plane' },
    { title: 'Favorites', url: '/home/Favorites', icon: 'heart' },
    { title: 'Archived', url: '/home/Archived', icon: 'archive' },
    { title: 'Trash', url: '/home/Trash', icon: 'trash' },
    { title: 'Spam', url: '/home/Spam', icon: 'warning' },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor() { }

  ngOnInit() {}

}
