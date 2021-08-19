import { CalModalComponent } from './components/modal/cal-modal/cal-modal.component';
import { BrowserModule } from '@angular/platform-browser';
import { ComparativComponent } from './components/comparativ/comparativ.component';
import { CalendarMonthComponent } from './components/calendar-month/calendar-month.component';
import { CalendarHeaderComponent } from './components/calendar-header/calendar-header.component';
import { CalendarListComponent } from './components/calendar-list/calendar-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgCalendarModule } from 'ionic2-calendar';
import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/ro';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { BizInputsModule } from './modules/biz-inputs/biz-inputs.module';
import { IconsComponent } from './components/icons/icons.component';
import { DayViewSchedulerComponent } from './components/comparativ/day-view-scheduler.component';
import { ModalModule } from './components/modal/modal.module';
registerLocaleData(localeDe);


@NgModule({
  declarations: [
    CalendarComponent,
    SideMenuComponent,
    CalendarListComponent,
    CalendarHeaderComponent,
    IconsComponent,
    CalendarMonthComponent,
    ComparativComponent,
    DayViewSchedulerComponent,
    CalModalComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    NgCalendarModule,
    BizInputsModule,
    ModalModule
  ],
  exports: [
    CalendarComponent,
    SideMenuComponent,
    CalendarListComponent,
    CalendarHeaderComponent,
    IconsComponent,
    ReactiveFormsModule,
    BizInputsModule,
    CalendarMonthComponent,
    ComparativComponent,
    DayViewSchedulerComponent,
    CalModalComponent,
    ModalModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'ro' }
  ]
})
export class SharedModule { }
