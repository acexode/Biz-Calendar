import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import {
  CalendarDateFormatter,
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
  CalendarWeekViewBeforeRenderEvent
} from 'angular-calendar';
import { subDays, startOfDay, addDays, endOfMonth, addHours, getDay, isSameDay } from 'date-fns';
import { Subject, Subscriber, Subscription } from 'rxjs';
import { appointmentEndpoints } from 'src/app/core/configs/endpoints';
import { unsubscriberHelper } from 'src/app/core/helpers/unsubscriber.helper';
import { RequestService } from 'src/app/core/services/request/request.service';
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
  dummyData = [
    {
      title: 'User Name',
      cabinetUID: 'ccedb51b-f381-4f89-924c-516af87411fb',
      cabinetsScheduleUID: '4ce71467-4410-47b3-88a7-35b801411238',
      dayID: 1,
      endHour: 13,
      endMin: 0,
      physicianUID: '6e3c43b9-0a07-4029-b707-ca3570916ad5',
      startHour: 9,
      startMin: 0,
      start: addHours(startOfDay(new Date('2021-10-18')), 9),
      end: addHours(startOfDay(new Date('2021-10-18')), 13),
      color: colors.bizPrimary,
      actions: this.actions,
      resizable: {
        beforeStart: false,
        afterEnd: false,
      },
      draggable: true,
    }
  ];
  getAppointments$: Subscription;

  cabinetData = cabinetData;
  constructor(
    private modalController: ModalController,
    private reqService: RequestService,
  ) { }

  ngOnInit() {
    console.log(cabinetData);
    // this.getApointments();
    /* setTimeout(() => {
      const ev = [
      {
      start: addHours(startOfDay(new Date()), 2),
      end: addHours(startOfDay(new Date()), 3),
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
      this.events.push(...this.dummyData);
      console.log(this.events);
      this.refresh.next();
    }, 3000); */
    this.events.push(...this.dummyData);
    // console.log(this.events);
    this.refresh.next();
   }
  handleEvent(action: string, event: CalendarEvent): void {
    // console.log(event);
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
  closeModal() {
    this.modalController.dismiss({
      dismissed: true,
    });
  }
  /* beforeWeekViewRender(renderEvent: CalendarWeekViewBeforeRenderEvent) {
    console.log(renderEvent);
    renderEvent.hourColumns.forEach((hourColumn) => {
      hourColumn.hours.forEach((hour) => {
        hour.segments.forEach((segment) => {
          if (
            segment.date.getHours() >= 2 &&
            segment.date.getHours() <= 5 &&
            segment.date.getDay() === 2
          ) {
            segment.cssClass = 'bg-pink';
          }
        });
      });
    });
  } */
  beforeWeekViewRender(renderEvent: CalendarWeekViewBeforeRenderEvent) {
    renderEvent.hourColumns.forEach((hourColumn) => {
      this.cabinetData.schedules.forEach(schedule => {
        // console.log('schedule: ', schedule);
        hourColumn.hours.forEach((hour) => {
            hour.segments.forEach((segment) => {
              // console.log('segments: ', segment);
              if (segment.isStart) {
                segment.cssClass = 'red-bg';
              } else {
                segment.cssClass = 'pink-bg';
              }
              console.log(segment);
            });
          });
        });


      /*  */
    });

  }
  range(start: any, end: any, step = 1) {
      const output = [];
      if (typeof end === 'undefined') {
        end = start;
        start = 0;
      }
      for (let i = start; i < end; i += step) {
        output.push(i);
      }
      return output;
    };

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

  getApointments() {
    this.getAppointments$ = this.reqService.post(
      appointmentEndpoints.getAppointment,
      /* {
        cabinetUID: 'ccedb51b-f381-4f89-924c-516af87411fb'
      } */
      {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        EndDate: '2021-11-06T20:00:00.999Z',
        // eslint-disable-next-line @typescript-eslint/naming-convention
        StartDate: '2021-10-31T07:00:00.000Z',
        physicianUID: '6e3c43b9-0a07-4029-b707-ca3570916ad5',
      }
    )
      .subscribe(
        (d: any) => console.log(d)
      );
  }

  ngOnDestroy() {
    unsubscriberHelper(this.getAppointments$);
  }

}
