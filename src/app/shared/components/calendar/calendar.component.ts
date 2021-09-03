import { CalendarService } from './../../../core/services/calendar/calendar.service';
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable prefer-arrow/prefer-arrow-functions */
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
  const colors: any = {
    green: {
      primary: '#D5EED1',
      secondary: '#2EA81B',
    },
    blue: {
      primary: '#D6E9FE',
      secondary: '#3093F8',
    },
    yellow: {
      primary: '#e7d597',
      secondary: '#FFC715',
    },
    orange: {
      primary: '#ecb986',
      secondary: '#F77C00',
    },
    transparent: {
      primary: 'white',
      secondary: 'white',
    },
  };
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  providers: [
    {
      provide: CalendarDateFormatter,
      useClass: CustomDateFormatter,
    },
  ],
})
export class CalendarComponent implements OnInit {

    @Input() display;
    @Input() calendarList;
    @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;
    currentDate = new Date().getDate();
    activatedPath  = '';
    isTablet = false;
    public calendarPages = CalendarPages;
    view: CalendarView = CalendarView.Month;
    CalendarView = CalendarView;
    viewDate: Date = new Date();
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
    // events: CalendarEvent[] = [

        // {
        //   title: 'Vacation',
        //   color: colors.transparent,
        //   start: new Date(2021,7,4,8),
        //   allDay: true,
        //   meta: 'Vacation'
        // },
        // {
        //   title: 'Vacation',
        //   color: colors.transparent,
        //   start: new Date(2021,7,11,8),
        //   allDay: true,
        //   meta: 'Vacation'
        // },
    //     {
    //     start: subDays(startOfDay(new Date()), 1),
    //     end:  addDays(new Date(), 1),
    //     title: null,
    //     cssClass: '',
    //     actions: null,
    //     },
    //     {
    //     start: new Date(2021,7,14,10),
    //     end: new Date(2021,7,14,10,30),
    //     title: 'Angela Ghica Protopopescu • Consult control gastroenterologie, Ecografie abdominală',
    //     color: colors.transparent,
    //     actions: this.actions,
    //     },
    //     {
    //     start: new Date(2021,7,this.currentDate,10,30),
    //     end: new Date(2021,7,this.currentDate,11,30),
    //     title: 'Meeting with Mr A',
    //     color: colors.transparent,
    //     actions: this.actions,
    //     },
    //     {
    //     start: addHours(new Date(), .4),
    //     title: 'Birthday event for Mr B',
    //     color: colors.transparent,
    //     actions: this.actions,
    //     },
    //     {
    //     start: addHours(new Date(), 1),
    //     title: 'An event with no end dated',
    //     color: colors.transparent,
    //     actions: this.actions,
    //     },
    //     {
    //     start: subDays(endOfMonth(new Date()), 3),
    //     end: addDays(endOfMonth(new Date()), 3),
    //     title: 'A long event that spans 2 months',
    //     color: colors.transparent,
    //     allDay: true,
    //     },
    //     {
    //     start: addHours(new Date(), 2),
    //     end: addHours(new Date(), 2),
    //     title: 'A draggable and resizable event',
    //     color: colors.transparent,
    //     actions: this.actions,
    //     resizable: {
    //         beforeStart: true,
    //         afterEnd: true,
    //     },
    //     draggable: true,
    //     },
    // ];
    events: CalendarEvent[] = [

    ];
    activeDayIsOpen = true;
    eventSource;
    viewTitle;
    isToday: boolean;
    constructor(route: ActivatedRoute, private router: Router, private calS: CalendarService) {
      this.activatedPath = '/' + route.snapshot.paramMap.get('id');
      // console.log(addHours(startOfDay(new Date()), 2));
      // console.log(addHours(new Date(), 3));
    }

    ngOnInit() {
      this.calS.selectedDate.subscribe(e =>{
        this.viewDate = new Date(e);
      });
      this.events = [
        {
          title: 'Vacation',
          color: colors.transparent,
          start: new Date(2021,7,4,8),
          allDay: true,
          meta: {
            icon: 'cnas',
            cssClass: 'bg-green'
          }
        },
        {
          title: 'Vacation',
          color: colors.blue,
          start: addHours(startOfDay(new Date()), 10),
          end: addHours(new Date(), 11),
          meta: {
            icon: 'nou',
            cssClass: 'bg-green'
          }
        },
        {
          title: '',
          color: colors.blue,
          start: addHours(startOfDay(new Date()), 8),
          end: addHours(new Date(), 2),
          // meta: {
          //   icon: '',
          //   cssClass: 'green-pattern border-none'
          // }
        },
        {
          title: 'Angela Ghica Protopopescu • Consult control gastroenterologie, Ecografie abdominală',
          color: colors.blue,
          start: addHours(startOfDay(new Date()), 11),
          // end: addHours(new Date(), -5),
          meta: {
            icon: 'nou',
            cssClass: 'bg-blue-light'
          }
        },
        {
          title: 'Alexandru Daniel Roscovici • Evaluare nivel sănătate emoțională • Donec nisi nisi, ultricies luctus massa non, ',
          color: colors.blue,
          start: addHours(startOfDay(new Date()), 12),
          // end: addHours(new Date(), -5),
          meta: {
            icon: '',
            cssClass: 'bg-blue'
          }
        },
        {
          start: subDays(startOfDay(new Date()), 1),
          end: addDays(new Date(), 1),
          title: 'A 3 day event',
          color: colors.red,
          actions: this.actions,
          allDay: true,
          resizable: {
            beforeStart: true,
            afterEnd: true,
          },
          draggable: true,
        },
        {
          start: startOfDay(new Date()),
          title: 'An event with no end date',
          color: colors.yellow,
          actions: this.actions,
          meta: {
            icon: 'nou',
            cssClass: 'bg-green'
          },
        },
        {
          start: subDays(endOfMonth(new Date()), 3),
          end: addDays(endOfMonth(new Date()), 3),
          title: 'A long event that spans 2 months',
          color: colors.blue,
          allDay: true,
        },
        // {
        //   start: addHours(startOfDay(new Date()), 2),
        //   end: addHours(new Date(), 0),
        //   title: 'A draggable and resizable event',
        //   color: colors.yellow,
        //   actions: this.actions,
        //   resizable: {
        //     beforeStart: true,
        //     afterEnd: true,
        //   },
        //   draggable: true,
        // },
      ];
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
        //this.modal.open(this.modalContent, { size: 'lg' });
      }

      addEvent(): void {
        this.events = [
          ...this.events,
          {
            title: 'New event',
            start: startOfDay(new Date()),
            end: endOfDay(new Date()),
            color: colors.red,
            draggable: true,
            resizable: {
              beforeStart: true,
              afterEnd: true,
            },
          },
        ];
      }

      deleteEvent(eventToDelete: CalendarEvent) {
        this.events = this.events.filter((event) => event !== eventToDelete);
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
        return 'green-pattern';
      }else if(hours > 10 && hours < 13){
        return 'blue-pattern';
      }else{
        return 'green-pattern';

      }
    }
}
