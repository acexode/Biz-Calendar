import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { differenceInCalendarYears, getDay, getYear } from 'date-fns';
import { Subscription } from 'rxjs';
import { Person } from 'src/app/core/models/person.model';
import { RequestService } from 'src/app/core/services/request/request.service';
import { location } from 'src/app/core/configs/endpoints';
import { ToastService } from 'src/app/core/services/toast/toast.service';
import { unsubscriberHelper } from 'src/app/core/helpers/unsubscriber.helper';
@Component({
  selector: 'app-pacient-view-modal',
  templateUrl: './pacient-view-modal.component.html',
  styleUrls: ['./pacient-view-modal.component.scss'],
})
export class PacientViewModalComponent implements OnInit, OnDestroy {
  @Input() data!: Person;
  getCities$: Subscription;
  address = '';
  addressLoader = true;

  constructor(
    private modalController: ModalController,
    private reqS: RequestService,
    private toastService: ToastService,
  ) { }
  ngOnInit() {
    this.getCities();
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
    return new Date(this.data?.birthDate)?.getDate();
  }
  get birthAge() {
    return differenceInCalendarYears(
      new Date(),
      new Date(this.data?.birthDate),
    );
  }
  getCities() {
    if ( this.data.cityID) {
      this.getCities$ = this.reqS.post(location.getCities, {
        cityID: this.data.cityID,
      })
      .subscribe(
        (d: any) => {
          console.log(d);
          this.address = d?.cities?.[0]?.name;
          this.addressLoader = false;
        },
        _err => {
          this.toastService.presentToastWithDurationDismiss(
            'Unable to get city at this instance. Please check your network and try again. C012'
          );
          this.addressLoader = false;
        }
      );
    } else {
      this.addressLoader = false;
    }
  }
  get userAddress() {
    return this.address;
  }
  ngOnDestroy() {
    unsubscriberHelper(this.getCities$);
  }

}
