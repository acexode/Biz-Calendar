import {   CalendarMode, Step, CalendarComponent } from 'ionic2-calendar/calendar';
import { Component, Inject, LOCALE_ID, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { formatDate } from '@angular/common';
import { Title } from '@angular/platform-browser';
interface CalendarType {
  id: number;
  time: string;
  location: string;
  title: string;
  desc: string;
  bgColor: string;
  borderColor: string;
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
  calendarList: CalendarType[];
  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.page = this.activatedRoute.snapshot.paramMap.get('id');
    if(this.page === 'list'){
      this.calendarList = [
        {
          id: 1,
          title: 'Angela Ghica Protopopescu',
          time: '09:00 - 09:30',
          desc: 'Consult control gastroenterologie, Ecografie abdominală',
          location: 'Buc. Aviatori',
          borderColor: '#2EA81B',
          bgColor: '#EAF6E8'
        },
        {
          id: 2,
          title: 'Alexandru Daniel Roscovici',
          time: '07:00 - 09:30',
          desc: 'Evaluare nivel sănătate emoțională • Donec nisi nisi, ultricies luctus massa non, commodo ultricies lectus...',
          location: 'Buc. Aviatori',
          borderColor: '#3093F8',
          bgColor: '#EAF4FE'
        },
        {
          id: 3,
          title: 'Maria Iovan Plăieșu',
          time: '14:00 - 14:20',
          desc: 'Nunc scelerisque, nulla vel vehicula malesuada, dui nunc mattis erat, eu cursus orci urna vel mauris. ',
          location: 'Buc. Aviatori',
          borderColor: '#F77C00',
          bgColor: '#FEECD9'
        },
      ];
    }
  }


}
