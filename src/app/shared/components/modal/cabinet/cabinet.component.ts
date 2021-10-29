import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import {
  CalendarDateFormatter,
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
  CalendarWeekViewBeforeRenderEvent
} from 'angular-calendar';
import { CalendarWeekViewHourSegmentComponent } from 'angular-calendar/modules/week/calendar-week-view-hour-segment.component';
import { startOfDay, addHours, format, formatRFC3339,} from 'date-fns';
import { Subject, Subscription } from 'rxjs';
import { unsubscriberHelper } from 'src/app/core/helpers/unsubscriber.helper';
import { ToastService } from 'src/app/core/services/toast/toast.service';
import { CustomDateFormatter } from '../../calendar/custom-date-formatter.provider';
import { CabinetNotifyComponent } from '../cabinet-notify/cabinet-notify.component';
import { cabinetData } from './dummyDataForCabinet';
import { ViewChild} from '@angular/core';
import { DatePickerModalComponent } from '../date-picker-modal/date-picker-modal.component';
import { ProgrammareService } from 'src/app/core/services/programmare/programmare.service';

const colors: any = {
  bizPrimary: {
    primary: '#ffffff',
    secondary: '#1EA5C7',
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
export class CabinetComponent implements OnInit, OnDestroy {

  // cabinetData = cabinetData;
  @Input() cabinetData: any;
  @Input() cabinetName: string;
  @Input() appointments: any[];
  @Input() schedules: any[];
  @Input() viewDate: Date;
  @Input() cabinetUID: string;

  view: CalendarView = CalendarView.Month;

  page = 'zile-lucratoare';
  refresh: Subject<any> = new Subject();
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
  bgColor = ['green-bg-color-step-20', 'orange-bg-color-step-20', 'green-bg-color-step-20', 'orange-bg-color-step-10'];
  events: CalendarEvent[] = [];
  getAppointments$: Subscription;

  get weekDate() {
    return this.viewDate || new Date();
  }
  get monthOfDate() {
    return new Intl.DateTimeFormat('ro', { month: 'long' }).format(this.viewDate)
      || new Intl.DateTimeFormat('ro', { month: 'long' }).format(new Date());
  }
  constructor(
    private modalController: ModalController,
    private programmareS$: ProgrammareService
  ) { }

  ngOnInit() {

    if (this.appointments && this.appointments.length > 0) {

      const eventFromAppointement = this.appointments.map(
      (v: any) => (
        {
          ...v,
          resizable: {
            beforeStart: false,
            afterEnd: false,
          },
          draggable: false,
          start: new Date(v.startTime),// addHours(startOfDay(new Date()), 9),
          end: new Date(v.endTime),// addHours(startOfDay(new Date()), 10),
          title: 'Rez.',
          color: colors.bizPrimary,
          actions: this.actions,
        }
      )
      );
      this.events.push(...eventFromAppointement);
      this.refresh.next();

    }
   }
  handleEvent(action: string, event: CalendarEvent): void {}
  hourSegmentClicked(event: any) {
    this.presentCabinentNotify(event.date);
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
  closeModal() {
    console.log('close');
    this.modalController.dismiss({
      dismissed: true,
      d: null,
    });
  }
  beforeWeekViewRender(renderEvent: CalendarWeekViewBeforeRenderEvent) {

    if (this.schedules && this.schedules.length > 0) {


      renderEvent.hourColumns.forEach((hourColumn) => {
      this.schedules
        .map((v: any) => ({
          ...v,
          abbrvName: `${v.physicianFirstName.split('')[0]}.${v.physicianLastName.split('')[0]}`
        }))
        .forEach((schedule: any, index: number) => {
          hourColumn.hours.forEach((hour) => {
            hour.segments.forEach((segment) => {


              if ((segment.date >= schedule.startTime && segment.date < schedule.endTime)) {


                    segment.cssClass = `${this.bgColor[index % this.bgColor.length]} ${schedule.abbrvName}`;
              }
              });
            });
          });
         });
    }
  }

  async presentCabinentNotify(date: Date = new Date()) {
    const modal = await this.modalController.create({
      component: CabinetNotifyComponent,
      cssClass: 'biz-modal-class-type-a modal-wrapper-with-236px-height',
      backdropDismiss: true,
      componentProps: {
        notifyType: 'typeB',
        date,
      },
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    const { dismissed, selecteaza, renita, dateData} = data;
    if (dismissed && !renita && !selecteaza) {
      this.presentDatePicker(data);
    }
    if (selecteaza) {
      this.programmareS$.updateProgrammareDateData(dateData, this.cabinetUID);
      this.closeModal();
    }
  }
  async presentDatePicker({isHoutMinutesPicker, dateData: date}) {
    const modal = await this.modalController.create({
      component: DatePickerModalComponent,
      cssClass: 'biz-modal-class-type-no-background width-md-100',
      backdropDismiss: false,
      componentProps: {
        pickerType: isHoutMinutesPicker ? 'hourMinutes' : 'dayMonth',
        date: formatRFC3339(date,  { fractionDigits: 3 })
      },
    });
    await modal.present();
     const { data } = await modal.onWillDismiss();
    const { dismissed, dateData } = data;
    if (dismissed) {
      this.presentCabinentNotify(new Date(dateData || date));
    }
  }

  ngOnDestroy() {
    unsubscriberHelper(this.getAppointments$);
  }

}
