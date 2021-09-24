/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable prefer-arrow/prefer-arrow-functions */

import { AppointmentResponse, Appointment } from './../../../core/models/appointment.interface';
import { CalendarService } from './../../../core/services/calendar/calendar.service';
import { Component, Input, OnInit,ChangeDetectionStrategy,ViewChild,
    TemplateRef,ChangeDetectorRef,
    ViewEncapsulation,
    OnDestroy} from '@angular/core';
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
  import { Observable, Subject, Subscription } from 'rxjs';
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


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: CalendarDateFormatter,
      useClass: CustomDateFormatter,
    },
  ]
})
export class CalendarComponent implements OnInit, OnDestroy {

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
    events: any[] =[];
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
    appointments$: Subscription ;
    activeDayIsOpen = true;
    eventSource;
    viewTitle;
    isToday: boolean;
    constructor(route: ActivatedRoute, private router: Router, private calS: CalendarService,
       private cdRef: ChangeDetectorRef) {
      this.activatedPath = '/' + route.snapshot.paramMap.get('id');
      this.calS.selectedPath.next(route.snapshot.paramMap.get('id'));
    }


    ngOnInit() {
      this.events = [
        {
          start: addHours(new Date(), 3),
          end: addHours(new Date(), 4),
          title: 'A 3 day event',
          color: {
            primary:    'yellow'
          },
          actions: this.actions,
          allDay: true,
          resizable: {
            beforeStart: true,
            afterEnd: true,
          },
          draggable: true,
        }
      ];

      this.getEventLists();
      this.calS.selectedDate.subscribe(e =>{
        // console.log(e);
        if(e !== null){
          this.getEventLists();
        }
        this.viewDate = new Date(e);
      });

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
      this.calS.eventLists$.subscribe(e =>{
        if(e?.length > 0){
          const event =   e?.map(d => ({
            start:  addHours(new Date(),5),
            end: addHours(new Date(),6),
            title: d.personName,
            color: {
              primary: this.calS.colorCode(d.colorCode)
            },
            actions: this.actions,
            allDay: true,
            resizable: {
              beforeStart: true,
              afterEnd: true,
            },
            draggable: true,
          }));
          this.events.push(...event);
          this.refresh.next();

        }
        console.log(this.events);
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
        console.log(this.events);
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
          // console.log(day)
          const dayOfMonth = day.date.getDate();
          const vacations = [4,11];
          if (vacations.includes(dayOfMonth) && day.inMonth) {
            // console.log(day);
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
    ngOnDestroy(): void {
      // this.appointments$.unsubscribe();
    }
}
