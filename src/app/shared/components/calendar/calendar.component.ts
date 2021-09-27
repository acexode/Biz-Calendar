/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable prefer-arrow/prefer-arrow-functions */

import { AppointmentResponse, Appointment } from './../../../core/models/appointment.interface';
import { CalendarService } from './../../../core/services/calendar/calendar.service';
import { Component, Input, OnInit,ChangeDetectionStrategy,ViewChild,
    TemplateRef,
    ViewEncapsulation} from '@angular/core';
import { CalendarMode, Step } from 'ionic2-calendar/calendar';
import { CustomDateFormatter } from './custom-date-formatter.provider';
  import {
    startOfDay,
    endOfDay,
    subDays,
    addDays,
    endOfMonth,
    isSameDay,
    isSameMonth,
    addHours,
    format,
    startOfMonth,
    startOfWeek,
    endOfWeek,
  } from 'date-fns';
  import { Observable, Subject } from 'rxjs';
//   import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
  import {
      CalendarDateFormatter,
    CalendarEvent,
    CalendarEventAction,
    CalendarEventTimesChangedEvent,
    CalendarMonthViewBeforeRenderEvent,
    CalendarView,
  } from 'angular-calendar';
import { ActivatedRoute, Router } from '@angular/router';
import {map} from 'rxjs/operators';
import { CalendarPages } from './calendarPages';
import { ro } from 'date-fns/locale';


function getTimezoneOffsetString(date: Date): string {
  const timezoneOffset = date.getTimezoneOffset();
  const hoursOffset = String(
    Math.floor(Math.abs(timezoneOffset / 60))
  ).padStart(2, '0');
  const minutesOffset = String(Math.abs(timezoneOffset % 60)).padEnd(2, '0');
  const direction = timezoneOffset > 0 ? '-' : '+';

  return `T00:00:00${direction}${hoursOffset}:${minutesOffset}`;
}

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  providers: [
    {
      provide: CalendarDateFormatter,
      useClass: CustomDateFormatter,
    },
  ]
})
export class CalendarComponent implements OnInit {

  @Input() display;
  @Input() calendarList;
  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;
  public calendarPages = CalendarPages;
    currentDate = new Date().getDate();
    activatedPath  = '';
    isTablet = false;
    view: CalendarView = CalendarView.Month;
    CalendarView = CalendarView;
    viewDate: Date = new Date();
    events: CalendarEvent [] = [];
    excludeDays: number[] = [0, 6];
    modalData: {
        action: string;
        event: CalendarEvent;
    };
    actions: CalendarEventAction[] = [
        {
        label: '<i class="fas fa-fw fa-pencil-alt"></i>',
        a11yLabel: 'Edit',
        onClick: ({ event }: { event: CalendarEvent }): void => {
            this.handleEvent('Edited', event);
        },
        },
        {
        label: '<i class="fas fa-fw fa-trash-alt"></i>',
        a11yLabel: 'Delete',
        onClick: ({ event }: { event: CalendarEvent }): void => {
            this.events = this.events.filter((iEvent) => iEvent !== event);
            this.handleEvent('Deleted', event);
        },
        },
    ];
    refresh: Subject<any> = new Subject();

    events$: Observable<CalendarEvent[]>;
    activeDayIsOpen = true;
    eventSource;
    viewTitle;
    isToday: boolean;
    constructor(route: ActivatedRoute, private router: Router, private calS: CalendarService) {
      this.activatedPath = '/' + route.snapshot.paramMap.get('id');
      this.calS.selectedPath.next(route.snapshot.paramMap.get('id'));

      // console.log(addHours(startOfDay(new Date()), 2));
      // console.log(addHours(new Date(), 3));
    }

  ngOnInit() {
    console.log(this.display, this.viewDate, this.events);
      this.calS.selectedDate.subscribe(e =>{
        console.log(e);
        this.viewDate = new Date(e);
        this.getEventLists();
      });
      this.getEventLists();
      this.isTablet = window.innerWidth >= 768 ? true : false;
      window.addEventListener('resize', ()=>{
        this.isTablet = window.innerWidth >= 768 ? true : false;
      });
        if(this.display === 'zi'){
            const day = new Date().getDay();
            // this.excludeDays = [3, 3];
            this.setView(this.CalendarView.Day);
        }else if(this.display === 'zile-lucratoare'){
            this.excludeDays = [0, 6];
            this.setView(this.CalendarView.Week);
          }else if(this.display === 'saptamana'){
            this.excludeDays = [];
            this.setView(this.CalendarView.Week);
        }
        else if(this.display === 'luna'){
          this.setView(this.CalendarView.Month);
        }
        this.refresh.next();
    }


    getEventLists(){
      this.calS.appointments$.subscribe(e =>{
        console.log(e);
        this.events = e?.appointments.map(d => ({
          start:  new Date(d.startTime ),
          end:  new Date(d.endTime),
          title: d.personName,
          color: {
            primary: '',
            secondary:''
          },
          actions: this.actions,
          allDay: false,
          resizable: {
            beforeStart: true,
            afterEnd: true,
          },
          draggable: true,
          meta:{
            cssClass: this.calS.colorCode(d.colorCode),
            icon: this.calS.iconCode(d.icons)
          }
        }));
        console.log(this.events);
        this.refresh.next();

      });
      console.log(this.events);
    }
    navigate(path){
      this.router.navigate(['/home' +path]);
    }
    // angular calendar
    dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
      this.viewDate = date;
      this.view = CalendarView.Day;
        if (isSameMonth(date, this.viewDate)) {
          if (
            (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
            events.length === 0
          ) {
            this.activeDayIsOpen = false;
          } else {
            this.activeDayIsOpen = true;
          }
          this.viewDate = date;
        }
      }

      eventTimesChanged({
        event,
        newStart,
        newEnd,
      }: CalendarEventTimesChangedEvent): void {
        this.events = this.events.map((iEvent) => {
          if (iEvent === event) {
            return {
              ...event,
              start: newStart,
              end: newEnd,
            };
          }
          return iEvent;
        });
        this.handleEvent('Dropped or resized', event);
      }

      handleEvent(action: string, event: CalendarEvent): void {
          console.log(event);
          this.viewDate = new Date(event.start);
          this.view = CalendarView.Day;
          this.modalData = { event, action };
        // this.modal.open(this.modalContent, { size: 'lg' });
      }


      setView(view: CalendarView) {
        this.view = view;
      }

      closeOpenMonthViewDay() {
        this.activeDayIsOpen = false;
      }

      beforeMonthViewRender(renderEvent: CalendarMonthViewBeforeRenderEvent): void {
        renderEvent.body.forEach((day) => {
          const dayOfMonth = day.date.getDate();
          const vacations = [4,11];
          if (vacations.includes(dayOfMonth) && day.inMonth) {
            console.log(day);
            day.cssClass = 'vacation-bg';
          }
        });
      }
    setBg(d){
      const hours = new Date(d).getHours();
      if(hours > 7 && hours <= 10){
        return 'cabinet-not-confirmed-v1';
      }else if(hours > 10 && hours < 13){
        return 'blue-pattern';
      }else{
        return 'green-pattern';

      }
    }
}
