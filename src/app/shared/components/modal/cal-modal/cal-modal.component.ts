import { Component, Input, OnInit } from '@angular/core';
import { ModalController, MenuController } from '@ionic/angular';
import { format } from 'date-fns';
import { ro } from 'date-fns/locale';
import { CalendarMode, Step } from 'ionic2-calendar/calendar';
@Component({
  selector: 'app-cal-modal',
  templateUrl: './cal-modal.component.html',
  styleUrls: ['./cal-modal.component.scss'],
})
export class CalModalComponent implements OnInit {
  @Input() isTablet: boolean;
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
  constructor(private modalCtrl: ModalController, private menu: MenuController) { }

  ngOnInit() {
    console.log(this.isTablet);
  }


  onViewTitleChanged(title) {
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

  onTimeSelected(ev) {
      console.log('Selected time: ' + ev.selectedTime + ', hasEvents: ' +
          (ev.events !== undefined && ev.events.length !== 0) + ', disabled: ' + ev.disabled);
  }

  onCurrentDateChanged(event: Date) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      event.setHours(0, 0, 0, 0);
      this.isToday = today.getTime() === event.getTime();
  }
  toggleMenu(){
    this.menu.toggle();
  }

}
