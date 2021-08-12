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
registerLocaleData(localeDe);


@NgModule({
  declarations: [
    CalendarComponent,
    SideMenuComponent,
    CalendarListComponent,
    IconsComponent
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
    BizInputsModule
  ],
  exports: [
    CalendarComponent,
    SideMenuComponent,
    CalendarListComponent,
    IconsComponent,
    ReactiveFormsModule,
    BizInputsModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'ro' }
  ]
})
export class SharedModule { }
