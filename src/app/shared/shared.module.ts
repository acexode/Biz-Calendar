import { CalendarListComponent } from './components/calendar-list/calendar-list.component';
import { FormsModule } from '@angular/forms';
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
registerLocaleData(localeDe);


@NgModule({
  declarations: [
    CalendarComponent,
    SideMenuComponent,
    CalendarListComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    RouterModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    NgCalendarModule,
  ],
  exports: [
    CalendarComponent,
    SideMenuComponent,
    CalendarListComponent
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'ro' }
  ]
})
export class SharedModule { }
