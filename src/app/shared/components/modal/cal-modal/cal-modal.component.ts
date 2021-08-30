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
  month = format(new Date(), 'MMMM', { locale: ro });
  constructor(private modalCtrl: ModalController, private menu: MenuController) { }

  ngOnInit() {
    console.log(this.isTablet);
  }
  toggleMenu(){
    this.menu.toggle();
  }

}
