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
    format,
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

    events = [];
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
        const tempBg = ['green-bg', 'blue-bg', 'yellow-bg', 'orange-bg', 'green-pattern', 'gray-bg', 'blue-pattern'];
        const dates = e?.appointments.map(d => new Date(d.startTime).toLocaleDateString());
        const uniqDates = [...new Set(dates)];
        const appt = uniqDates.map(unq =>{
          const ev = e?.appointments.filter(s => new Date(s.startTime).toLocaleDateString() === unq );
          const formattedEvent: CalendarEvent[] = ev.map(form =>(
            {
              title: form.personName,
              color: colors.transparent,
              start: new Date(form.startTime),
              end: new Date(form.endTime),
              meta: {
                icon: 'cnas',
                cssClass: 'bg-green'
              }
            }
          ));
        return formattedEvent;
        });
        this.events = appt;

      });
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
