import {   CalendarMode, Step, CalendarComponent } from 'ionic2-calendar/calendar';
import { Component, Inject, LOCALE_ID, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { formatDate } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { EVENTLIST } from './event';
interface CalendarType {
  day: string;
  events: [
    {
      id: number;
      time: string;
      location: string;
      title: string;
      desc: string;
      bgColor: string;
      borderColor: string;

    }
  ];
}
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  // @ViewChild(CalendarComponent) myCal;
  public page: string;
  // eslint-disable-next-line @typescript-eslint/ban-types
  calendarList = [];
  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.page = this.activatedRoute.snapshot.paramMap.get('id');
    if(this.page === 'list'){
      this.calendarList = EVENTLIST;
    }
  }


}
