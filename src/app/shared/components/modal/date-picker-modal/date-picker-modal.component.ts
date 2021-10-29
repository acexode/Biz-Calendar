import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-date-picker-modal',
  templateUrl: './date-picker-modal.component.html',
  styleUrls: ['./date-picker-modal.component.scss'],
})
export class DatePickerModalComponent implements OnInit, AfterViewInit {
  @ViewChild('dateTime') datePicker: any;
  @Input() pickerType: 'hourMinutes' | 'dayMonth';
   @Input() date = '';

  constructor(private modalController: ModalController,) { }
  ngOnInit() { }
   ngAfterViewInit(): void {
    this.openDatePicker();
  }
  openDatePicker() {
    this.datePicker.open();
  }
  closeModal() {
    this.modalController.dismiss({
      dismissed: true,
      dateData: this.date
    });
  }
  get datePickerType() {
    return this.pickerType || 'date';
  }
  changed(_e: any) {
    this.closeModal();
  }
  pickerCancled(_e: any) {
    this.closeModal();
  }

}
