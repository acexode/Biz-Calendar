import { Component, OnInit } from '@angular/core';
import { CalendarDateFormatter, CalendarEvent, CalendarEventTimesChangedEvent } from 'angular-calendar';
import { Subject } from 'rxjs';
import { EVENTLIST } from 'src/app/home/event';
import { CustomDateFormatter } from '../../calendar/custom-date-formatter.provider';

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

  page = 'zile-lucratoare';
  refresh: Subject<any> = new Subject();
  viewDate: Date = new Date();
  excludeDays: number[] = [0, 6];
  events = [];
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
        /* this.events = this.events.map((iEvent) => {
          if (iEvent === event) {
            return {
              ...event,
              start: newStart,
              end: newEnd,
            };
          }
          return iEvent;
        }); */
        this.handleEvent('Dropped or resized', event);
      }

}
