import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from './calendar.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { IonicModule } from '@ionic/angular';
import { HourPipe } from 'src/app/core/pipes/hour.pipe';
import { ComparativComponent } from '../comparativ/comparativ.component';
import { CalendarListComponent } from '../calendar-list/calendar-list.component';
import { DayViewSchedulerComponent } from '../comparativ/day-view-scheduler.component';
import { NgCalendarModule } from 'ionic2-calendar';
import { CalendarMonthComponent } from '../calendar-month/calendar-month.component';



@NgModule({
  declarations: [
    CalendarComponent,
    HourPipe,
    ComparativComponent,
    CalendarListComponent,
    CalendarMonthComponent,
    DayViewSchedulerComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    NgCalendarModule
  ],
  exports: [
    CalendarComponent,
    HourPipe,
    ComparativComponent,
    CalendarListComponent,
    CalendarMonthComponent,
    DayViewSchedulerComponent
  ]
})
export class CalendarMainModule { }
