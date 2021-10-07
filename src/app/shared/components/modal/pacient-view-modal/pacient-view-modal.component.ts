import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { differenceInCalendarYears, getDay, getYear } from 'date-fns';
import { Person } from 'src/app/core/models/person.model';

@Component({
  selector: 'app-pacient-view-modal',
  templateUrl: './pacient-view-modal.component.html',
  styleUrls: ['./pacient-view-modal.component.scss'],
})
export class PacientViewModalComponent implements OnInit {
  @Input() data!: Person;

  constructor( private modalController: ModalController) { }
  ngOnInit() {
    const date = new Date(this.data?.birthDate);
    console.log(date);
  }
  closeModal(closeStatus: boolean = false, action: string = '') {
      this.modalController.dismiss({
        dismissed: true,
        personData: closeStatus ? this.data : null,
        action,
    });
  }
  get birthMonth() {
    return new Intl.DateTimeFormat('ro', { month: 'long' }).format(new Date(this.data?.birthDate));
  }
  get birthYear() {
    return getYear(new Date(this.data?.birthDate));
  }
  get birthDay() {
    return getDay(new Date(this.data?.birthDate));
  }
  get birthAge() {
    return differenceInCalendarYears(
      new Date(this.data?.birthDate),
      new Date()
    );
  }

}
