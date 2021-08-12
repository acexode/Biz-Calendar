import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { EVENTLIST } from 'src/app/home/event';
import { CalendarPages } from '../calendar/calendarPages';

@Component({
  selector: 'app-calendar-header',
  templateUrl: './calendar-header.component.html',
  styleUrls: ['./calendar-header.component.scss'],
})
export class CalendarHeaderComponent implements OnInit {
  isTablet = false;
  activatedPath  = '';
  public page: string;
  calendarList: {
    day: string;
    current: boolean;
    events: {
      id: number;
      title: string;
      time: string;
      desc: string;
      location: string;
      class: string;
    }[]; }[];
    public calendarPages = CalendarPages;
  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.isTablet = window.innerWidth >= 768 ? true : false;
    window.addEventListener('resize', ()=>{
      this.isTablet = window.innerWidth >= 768 ? true : false;
    });
    this.page = this.activatedRoute.snapshot.paramMap.get('id');
    if(this.page === 'list'){
      this.calendarList = EVENTLIST;
    }
  }
  navigate(path){
    this.router.navigate(['/home' +path]);
  }

}
