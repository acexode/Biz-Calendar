import { Component, OnInit } from '@angular/core';
import { CalendarDateFormatter, CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarView } from 'angular-calendar';
import { subDays, startOfDay, addDays, endOfMonth, addHours } from 'date-fns';
import { Subject } from 'rxjs';
import { CustomDateFormatter } from '../../calendar/custom-date-formatter.provider';

const colors: any = {
  bizPrimary: {
    primary: '#ffffff',
    secondary: '#3093F8',
  }
};


@Component({
  selector: 'app-cabinet',
  templateUrl: './cabinet.component.html',
  styleUrls: ['./cabinet.component.scss'],
   providers: [
    {
      provide: CalendarDateFormatter,
      useClass: CustomDateFormatter,
    },
  ],
})
export class CabinetComponent implements OnInit {
  view: CalendarView = CalendarView.Month;

  page = 'zile-lucratoare';
  refresh: Subject<any> = new Subject();
  dd = new Intl.DateTimeFormat('ro', { month: 'long' }).format(new Date());
  viewDate: Date = new Date();
  excludeDays: number[] = [0, 6];
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
  events: CalendarEvent[] = [
    {
      start: subDays(startOfDay(new Date()), 1),
      end: addDays(new Date(), 1),
      title: 'A 3 day event',
      color: colors.bizPrimary,
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
      color:  colors.bizPrimary,
      actions: this.actions,
    },
    {
      start: subDays(endOfMonth(new Date()), 3),
      end: addDays(endOfMonth(new Date()), 3),
      title: 'A long event that spans 2 months',
      color: colors.bizPrimary,
      allDay: true,
    },
    {
      start: addHours(startOfDay(new Date()), 2),
      end: addHours(new Date(), 2),
      title: 'A draggable and resizable event',
      color: colors.bizPrimary,
      actions: this.actions,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      draggable: true,
    },
  ];
  constructor() { }

  ngOnInit() { }
  handleEvent(action: string, event: CalendarEvent): void {
    console.log(event);
    this.viewDate = new Date(event.start);
    // this.view = CalendarView.Day;
    // this.modalData = { event, action };
  //this.modal.open(this.modalContent, { size: 'lg' });
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

}
