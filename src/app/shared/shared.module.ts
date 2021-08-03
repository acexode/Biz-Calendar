import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgCalendarModule } from 'ionic2-calendar';
import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/ro';
registerLocaleData(localeDe);


@NgModule({
  declarations: [
    CalendarComponent,
    SideMenuComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    NgCalendarModule,
  ],
  exports: [
    CalendarComponent,
    SideMenuComponent
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'ro' }
  ]
})
export class SharedModule { }
