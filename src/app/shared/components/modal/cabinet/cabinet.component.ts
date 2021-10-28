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
import { startOfDay, addHours,} from 'date-fns';
import { Subject, Subscription } from 'rxjs';
import { unsubscriberHelper } from 'src/app/core/helpers/unsubscriber.helper';
import { ToastService } from 'src/app/core/services/toast/toast.service';
import { CustomDateFormatter } from '../../calendar/custom-date-formatter.provider';
import { CabinetNotifyComponent } from '../cabinet-notify/cabinet-notify.component';
import { cabinetData } from './dummyDataForCabinet';

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
  view: CalendarView = CalendarView.Month;

  page = 'zile-lucratoare';
  refresh: Subject<any> = new Subject();
  monthOfDate = new Intl.DateTimeFormat('ro', { month: 'long' }).format(new Date());
  viewDate: Date = new Date(); // '2021/09/26'
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
  events: CalendarEvent[] = [
   /*  {
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
      draggable: true,
    },*/
    /* {
      start: subDays(endOfMonth(new Date()), 3),
      end: addDays(endOfMonth(new Date()), 3),
      title: 'A long event that spans 2 months',
      color: colors.bizPrimary,
      allDay: true,
    }, */
    /* {
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
    }, */
  ];
  getAppointments$: Subscription;

  constructor(
    private modalController: ModalController,
  ) { }

  ngOnInit() {
    console.log('this.cabinetData: ', this.schedules);
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
      console.log('eventFromAppointement: ', eventFromAppointement);
      this.events.push(...eventFromAppointement);
      this.refresh.next();

    }
   }
  handleEvent(action: string, event: CalendarEvent): void {
    console.log(action, event);
    // this.viewDate = new Date(event.start);
    // this.view = CalendarView.Day;
    // this.modalData = { event, action };
    //this.modal.open(this.modalContent, { size: 'lg' });
  }
  hourSegmentClicked(event: any) {
    console.log('hourSegmentClicked: ', event);
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
    this.modalController.dismiss({
      dismissed: true,
    });
  }
  beforeWeekViewRender(renderEvent: CalendarWeekViewBeforeRenderEvent) {

    if (this.schedules && this.schedules.length > 0) {

      console.log('here', this.schedules);


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

  async presentCabinentNotify() {
    const modal = await this.modalController.create({
      component: CabinetNotifyComponent,
      cssClass: 'biz-modal-class-type-a modal-wrapper-with-232px-height',
      backdropDismiss: true,
      componentProps: {
        notifyType: 'typeB'
      },
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    console.log(data);
    const { dismissed, renita, veziProgram } = data;
    if (dismissed && veziProgram) {}
  }

  ngOnDestroy() {
    unsubscriberHelper(this.getAppointments$);
  }

}
