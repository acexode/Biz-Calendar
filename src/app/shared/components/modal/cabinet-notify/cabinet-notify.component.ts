import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { addHours, addMinutes, format } from 'date-fns';
import { ProgrammareService } from 'src/app/core/services/programmare/programmare.service';

@Component({
  selector: 'app-cabinet-notify',
  templateUrl: './cabinet-notify.component.html',
  styleUrls: ['./cabinet-notify.component.scss'],
})
export class CabinetNotifyComponent implements OnInit {
  @Input() notifyType!: 'typeA' | 'typeB' | 'typeC';
  @Input() cabinetName!: string;
  @Input() date: Date;

  notifyTypes: any = {
    typeA: 'cabinet notify',
    typeB: 'calendar notify',
    typeC: 'note notify',
  };

  constructor(
    private modalController: ModalController,
    private programmareS$: ProgrammareService,
  ) { }

  ngOnInit() {}
  closeModal(v: string = '') {
    this.modalController.dismiss({
      dismissed: true,
      renita: v === 'RENUNȚĂ' ? true : false,
      veziProgram: v === 'VEZI PROGRAM' ? true : false,
      sterge: v === 'Șterge' ? true : false,
      selecteaza: v === 'SELECTEAZA' ? true : false,
      isHoutMinutesPicker: v === 'HOUR-MINUTES-PICKER' ? true : false,
      isDayMonthPicker: v === 'MONTH-DAY-PICKER' ? true : false,
      dateData: this.date,
    });
  }
  get notifyTypeToUse() {
    if (typeof this.notifyTypes !== 'undefined') {
      switch (this.notifyType) {
        case 'typeA':
          return this.notifyTypes.typeA;
        case 'typeB':
          return this.notifyTypes.typeB;
        case 'typeC':
          return this.notifyTypes.typeC;
        default:
          return this.notifyTypes.typeA;
      }
    }
  }
  intlDate() {
    return new Intl.DateTimeFormat(
      'ro',
      {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
      });
  }
  get theDate() {
    return this.date || new Date();
  }
  get formattedDate() {
    return this.intlDate()
      .format(this.theDate);
  }
  timeFormat(date: Date) {
    return new Intl.DateTimeFormat(
      'ro',
      {
        hour: 'numeric',
        minute: 'numeric',
      }).format(date);
  }
  get addOneHourToTime() {
    return (this.programmareS$.duration$.value
    && this.programmareS$.duration$.value > 59 ) ?
      addHours(this.date, 1) :
      addMinutes(this.date, this.programmareS$.duration$.value);
  }
  get time() {
    return `${this.timeFormat(this.theDate)} - ${this.timeFormat(this.addOneHourToTime)}`;
  }
  houtMinutesPicker() {
    this.closeModal('HOUR-MINUTES-PICKER');
  }
  isDayMonthPicker() {
    this.closeModal('MONTH-DAY-PICKER');
  }

}
