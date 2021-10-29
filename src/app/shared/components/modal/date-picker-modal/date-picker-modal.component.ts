import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-date-picker-modal',
  templateUrl: './date-picker-modal.component.html',
  styleUrls: ['./date-picker-modal.component.scss'],
})
export class DatePickerModalComponent implements OnInit, AfterViewInit {
  @ViewChild('dateTime') datePicker: any;

  constructor(private modalController: ModalController,) { }

  ngOnInit() { }
   ngAfterViewInit(): void {
    this.openDatePicker();
  }
  openDatePicker() {
    this.datePicker.open();
  }
  onClosePicker(event: any) {
    console.log(event);
    this.closeModal();
  }
  closeModal() {
    this.modalController.dismiss({
      dismissed: true,
    });
  }

}
