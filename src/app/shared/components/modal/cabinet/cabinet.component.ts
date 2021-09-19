import { Component, OnInit } from '@angular/core';
import { CalendarDateFormatter } from 'angular-calendar';
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
  constructor() { }

  ngOnInit() {}

}
