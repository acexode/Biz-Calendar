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
    getDay,
    differenceInHours,
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
    CalendarWeekViewBeforeRenderEvent,
  } from 'angular-calendar';
import { ActivatedRoute, Router } from '@angular/router';
import {map} from 'rxjs/operators';
import { CalendarPages } from './calendarPages';
import { ro } from 'date-fns/locale';
import { AuthService } from 'src/app/core/services/auth/auth.service';


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
    startEndTime: any = {};
    schedules = [];
    holidays = [];
    constructor(route: ActivatedRoute, private router: Router, private calS: CalendarService) {
      this.activatedPath = '/' + route.snapshot.paramMap.get('id');
      console.log(this.display);
      // this.calS.selectedPath.next(route.snapshot.paramMap.get('id'));
      this.startEndTime = JSON.parse(localStorage.getItem('workHours'));
      this.refresh.next();
    }

  ngOnInit() {
      this.calS.selectedDate.subscribe(e =>{
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
        this.schedules = e?.schedules ? e?.schedules : [];
        this.holidays = e?.phyFreeDays ? e?.phyFreeDays : [];
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
            cssClass: this.calS.colorCode(d.colorCode, 'weekMonth'),
            icon: this.calS.iconCode(d?.icons[0])
          }
        }));
        // console.log(this.events);
        this.refresh.next();

      });
      // console.log(this.events);
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
          this.viewDate = new Date(event.start);
          this.view = CalendarView.Day;
          this.modalData = { event, action };
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
          this.holidays.forEach(hol =>{
            const isSame = isSameDay(new Date(hol.startDate), new Date(day.date)) || isSameDay(new Date(hol.endDate), new Date(day.date));
            if(isSame){
              day.cssClass = 'holidays';
            }
          });
        });
      }
      beforeWeekViewRender(renderEvent: CalendarWeekViewBeforeRenderEvent) {
        renderEvent.hourColumns.forEach((hourColumn) => {
          const dow = this.schedules.filter(sc => sc.dow === getDay(hourColumn.date));
          const breakTime = dow?.filter(e => e.isBreakTime)[0];
          const allPrivate = [];
          const allCnas = [];
          const allBreak = [parseInt(breakTime?.start,10), parseInt(breakTime?.end,10)-1];
          dow.forEach(e => {
            if(e.isPrivate && !e.isBreak){
              allPrivate.push(...this.range(parseInt(e.start, 10), parseInt(e.end, 10)));
            }else if(!e.isPrivate && !e.isBreak){
              allCnas.push(...this.range(parseInt(e.start, 10), parseInt(e.end, 10)));
            }
          });
          const hols = this.holidays.map(h =>({startDate: h.startDate,endDate: h.endDate} ))[0];
          dow.forEach(day =>{
            const starttime = parseInt(day.start, 10);
            const endtime = parseInt(day.end, 10);
            hourColumn.hours.forEach((hour) => {
              hour.segments.forEach((segment) => {
                const isSame = isSameDay(new Date(hols?.startDate), new Date(segment.date)) ||
                isSameDay(new Date(hols?.endDate), new Date(segment.date));
                if(isSame){
                  segment.cssClass = 'holidays';
                }else{
                  if(allBreak.includes(segment.date.getHours()) ){
                    segment.cssClass = '';
                  }else  if(allPrivate.includes(segment.date.getHours())){
                    segment.cssClass = 'online-not-confirmed-v2 no-border';
                  }else{
                    // if(allCnas.includes(segment.date.getHours()))
                    segment.cssClass = 'cabinet-not-confirmed-v1 no-border';
                  }

                }
              });
            });
          });

          });
          renderEvent.header.forEach(head =>{
            this.holidays.forEach(hol =>{
              const diff = differenceInHours(hol.startDay, hol.endDate);
              // const phyHours = [...new Array(diff)].map((e, i) => i+1);
              const isSame = isSameDay(hol.startDay, head.date);
              renderEvent.hourColumns.forEach((hourColumn) => {
                hourColumn.hours.forEach((hour) => {
                  hour.segments.forEach((segment) => {
                    if (
                     isSame
                    ) {
                      segment.cssClass = 'holidays';
                    }
                  });
                });
              });
            });
          });
      }
    setBg(d){

      const hours = new Date(d).getHours();
      if(this.holidays?.length){
        this.holidays.forEach(hol =>{
          const diff = differenceInHours(hol.startDay, hol.endDate);
          const isSame = isSameDay(hol.startDate, d);
          if(isSame){
            return 'holidays';
          }
        });
      }else if(this.schedules?.length > 0){
        const breakTime = this.schedules?.filter(e => e.isBreakTime)[0];
        const allPrivate = [];
        const allCnas = [];
        const allBreak = [parseInt(breakTime.start,10), parseInt(breakTime.end,10)-1];
        this.schedules?.forEach(e => {
          if(e.isPrivate && !e.isBreak){
            allPrivate.push(...this.range(parseInt(e.start, 10), parseInt(e.end, 10)));
          }else if(!e.isPrivate && !e.isBreak){
            allCnas.push(...this.range(parseInt(e.start, 10), parseInt(e.end, 10)));
          }
        });
        if(allBreak.includes(hours) ){
          return '';
        }else  if(allPrivate.includes(hours)){
          return 'online-not-confirmed-v2 no-border';
        }else {
          //if(allCnas.includes(hours))
          return 'cabinet-not-confirmed-v1 no-border';
        }

      }

    }
    range(start, end, step = 1) {
      const output = [];
      if (typeof end === 'undefined') {
        end = start;
        start = 0;
      }
      for (let i = start; i < end; i += step) {
        output.push(i);
      }
      return output;
    };
}
