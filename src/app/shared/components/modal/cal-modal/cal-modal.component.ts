import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CalendarMode, Step } from 'ionic2-calendar/calendar';
@Component({
  selector: 'app-cal-modal',
  templateUrl: './cal-modal.component.html',
  styleUrls: ['./cal-modal.component.scss'],
})
export class CalModalComponent implements OnInit {
  @Input() isTablet: boolean;
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
  viewTitle: string;
  event = {
    title: '',
    desc: '',
    startTime: null,
    endTime: '',
    allDay: true
  };
  modalReady = false;
  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
    console.log(this.isTablet);
  }

}
