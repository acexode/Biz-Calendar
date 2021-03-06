import { CalendarService } from './../core/services/calendar/calendar.service';
import {   CalendarMode, Step, CalendarComponent } from 'ionic2-calendar/calendar';
import { Component, Inject, LOCALE_ID, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { formatDate } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { EVENTLIST } from './event';
import { CalendarPages } from '../shared/components/calendar/calendarPages';
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
  activatedPath  = '';
  isTablet = false;
  showFab = false;
  // eslint-disable-next-line @typescript-eslint/ban-types
  calendarList = [];
  public calendarPages = CalendarPages;
  constructor(private activatedRoute: ActivatedRoute, private router: Router, private calS: CalendarService) { }

  ngOnInit() {
    this.page = this.activatedRoute.snapshot.paramMap.get('id');
    this.calS.selectedPath.subscribe(e =>{
      if(e  === null){
        this.calS.selectedPath.next(this.page);
      }
    });
    if(this.page === 'lista'){
      this.calendarList = EVENTLIST;
    }
    if(this.page === 'aparate' || this.page === 'utilizatori' || this.page === 'cabinet'){
      this.page = 'comparativ';
    }
  }
  navigate(path){
    this.router.navigate(['/calendar' +path]);
  }
  showButtons(){
    this.showFab = true;
  }
  close(){
    this.showFab = false;
  }

}
