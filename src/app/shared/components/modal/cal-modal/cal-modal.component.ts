import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { CalendarService } from './../../../../core/services/calendar/calendar.service';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { ModalController, MenuController } from '@ionic/angular';
import { format } from 'date-fns';
import { ro } from 'date-fns/locale';
import { CalendarMode, Step } from 'ionic2-calendar/calendar';
@Component({
  selector: 'app-cal-modal',
  templateUrl: './cal-modal.component.html',
  styleUrls: ['./cal-modal.component.scss'],
})
export class CalModalComponent implements OnInit, OnDestroy {
  @Input() isTablet: boolean;
  @Input() showPicker: boolean;
  eventSource;
  viewTitle;

  isToday: boolean;
   calendar = {
        mode: 'month' as CalendarMode,
        step: 30 as Step,
        currentDate: new Date(),
        dateFormatter: {
            formatMonthViewDay: (date: Date)=> date.getDate().toString(),
            formatMonthViewDayHeader: (date: Date) => 'Mon',
            formatMonthViewTitle: (date: Date) => 'testMT',
            formatWeekViewDayHeader: (date: Date) => 'MonWH',
            formatWeekViewTitle: (date: Date) => 'testWT',
            formatWeekViewHourColumn: (date: Date)=> 'testWH',
            formatDayViewHourColumn:(date: Date) =>  'testDH',
            formatDayViewTitle: (date: Date) => 'testDT'
        }
    };
  event = {
    title: '',
    desc: '',
    startTime: null,
    endTime: '',
    allDay: true
  };
  modalReady = false;
  month = format(new Date(), 'MMMM', { locale: ro });
  showSub$: Subscription;
  currentRoute;
  comparativRoutes = ['utilizatori', 'cabinet','aparate', 'comparativ'];
  constructor(private modalCtrl: ModalController, private menu: MenuController, private routerS: Router,
    private calS: CalendarService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.currentRoute = this.route.snapshot.paramMap.get('id');
    console.log(this.currentRoute);
  }


  onViewTitleChanged(title) {
    this.calS.selectedMonth.next(title);
    this.viewTitle = title;
  }

  onEventSelected(event) {
      console.log('Event selected:' + event.startTime + '-' + event.endTime + ',' + event.title);
  }

  changeMode(mode) {
      this.calendar.mode = mode;
  }

  today() {
      this.calendar.currentDate = new Date();
  }

  onTimeSelected(ev, clicked= false) {
    console.log(ev.selectedTime, clicked);
    this.calS.selectedDate.next(ev.selectedTime);
    if(!this.comparativRoutes.includes(this.currentRoute)){
      this.routerS.navigate(['calendar/zi']);

    }
  }

  onCurrentDateChanged(event) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      event.setHours(0, 0, 0, 0);
      this.isToday = today.getTime() === event.getTime();
  }
  toggleMenu(){
    this.menu.toggle();
  }
  ngOnDestroy() {
    // this.showSub$.unsubscribe();
    // this.calS.selectedDate.unsubscribe();
  }

}
