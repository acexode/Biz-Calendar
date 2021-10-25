import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { LoadingController, ModalController } from '@ionic/angular';
import { addHours, getDay, isAfter, isBefore, isEqual, startOfDay } from 'date-fns';
import { get, find } from 'lodash';
import { Subscription } from 'rxjs';
import { cabinet } from 'src/app/core/configs/endpoints';
import { dayInAWeekWithDate } from 'src/app/core/helpers/date.helper';
import { unsubscriberHelper } from 'src/app/core/helpers/unsubscriber.helper';
import { GetCabinetSchedulesResponseModel } from 'src/app/core/models/getCabinetSchedules.response.model';
import { RequestService } from 'src/app/core/services/request/request.service';
import { IonRadioInputOption } from 'src/app/shared/models/components/ion-radio-input-option';
import { IonRadiosConfig } from 'src/app/shared/models/components/ion-radios-config';
import { IonTextItem } from 'src/app/shared/models/components/ion-text-item';
import { CabinetNotifyComponent } from '../cabinet-notify/cabinet-notify.component';
import { CabinetComponent } from '../cabinet/cabinet.component';

@Component({
  selector: 'app-biz-searchable-radio-modal',
  templateUrl: './biz-searchable-radio-modal.component.html',
  styleUrls: ['./biz-searchable-radio-modal.component.scss'],
})
export class BizSearchableRadioModalComponent implements OnInit, OnDestroy {

  @Input() config!: IonRadiosConfig;
  @Input() toCompareDate: Date;
  @Input() @Input() set options(opts: Array<IonRadioInputOption>) {
    this.opts = opts ? opts : [];
    this.updateItems();
  }
  @Input() checkList!: any;
  getCabinets$: Subscription;
  getCabinetScheldules$: Subscription;
  list!: any;
  ionicForm: FormGroup;

  isFormSubmitted = false;

  label: IonTextItem = {
    text: 'Default',
    classes: '',
    slot: 'end',
  };


  items: Array<{
    id: any;
    label: string;
    disabledStatus: boolean;
  }> = [];


  customRadioForm: FormGroup = this.fb.group({
    radio: ['', [Validators.required]],
  });
  cabinetOfEvent: GetCabinetSchedulesResponseModel[] = [];

  public subscriptions = new Subscription();

  private opts: Array<IonRadioInputOption> = [];

  constructor(
    private fb: FormBuilder,
    private modalController: ModalController,
    private cdRef: ChangeDetectorRef,
    private reqService: RequestService,
    public loadingController: LoadingController,
  ) {}
  ngOnInit(): void {
    this.updateItems();
  }
  closeModal() {
    this.modalController.dismiss({
      dismissed: true,
      radioValue: this.controlValue,
      selectedData: find(this.items, ['id', this.controlValue])
    });
  }
  checkRadio(event: any) {
   this.toggleRadio(event?.detail?.value);
  }
  get controlI() {
    return this.customRadioForm.get('radio');
  }
  get controlValue() {
    return this.controlI ? this.controlI.value : null;
  }
  toggleRadio(data: any) {
    if (this.controlI.disabled) {
      return;
    }
    this.controlI.setValue(data);
    this.cdRef.markForCheck();
    this.callCabinetProcess();
  }
  updateItems() {
    const labelK = get(this.config, 'labelKey', 'label');
    const idK = get(this.config, 'idKey', 'id');
    const disabledKey = get(this.config, 'disabledKey', 'disabledStatus');
    this.items = this.opts
      .map((v) => ({
        id: get(v, idK, null),
        label: get(v, labelK, null),
        disabledStatus: get(v, disabledKey, null),
      }))
      .filter((vv) => get(vv, 'id', null) !== null);
    this.cdRef.markForCheck();
  }
  async callCabinetProcess(cabinetUID: string = this.controlValue) {

    const loading = await this.loadingController.create({
            spinner: 'crescent',
            mode: 'md',
            // duration: 2000,
            message: 'Checking Cabinet...',
            translucent: true,
            cssClass: 'custom-class custom-loading'
        });
    await loading.present();

    if (cabinetUID) {
      const d = {
        // physicianUID: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        cabinetUID, // '3fa85f64-5717-4562-b3fc-2c963f66afa6'
      };
      this.getCabinetScheldules$ = this.reqService
        .post<Array<GetCabinetSchedulesResponseModel>>(cabinet.getCabinetsSchedules, d)
      .subscribe(
        (resps: GetCabinetSchedulesResponseModel[]) => {
          if (resps) {
            console.log('resps: ', resps);
            // dismiss loader
            loading.dismiss();
            /*  */
            if (resps.length > 0) {
              this.cabinetOfEvent = resps.map(
                (v: GetCabinetSchedulesResponseModel) => ({
                  ...v,
                  cabinetTime: dayInAWeekWithDate(new Date())[v.dayID],
                  // startTime: addHours(startOfDay(new Date()), v.startHour),
                  // endTime: addHours(startOfDay(new Date()), v.endHour)
                })
              ) .map((w: GetCabinetSchedulesResponseModel) => ({
                    ...w,
                    startTime: addHours(startOfDay(w.cabinetTime), w.startHour),
                    endTime: addHours(startOfDay(w.cabinetTime), w.endHour)
              })
              );
              console.log('cabinetOfEvent: ', this.cabinetOfEvent, this.toCompareDate);
              for (const res of this.cabinetOfEvent) {
                const checkIsBeforeEndTime = isBefore(res.endTime,
                  this.toCompareDate
                );
                const checkIsAfterStartTime = isAfter(res.startTime, this.toCompareDate);
                const isSameTime = isEqual(res.startTime, this.toCompareDate);
                console.log('checkIsBeforeEndTime: ', checkIsBeforeEndTime);
                console.log('checkIsAfterStartTime: ', checkIsAfterStartTime);
                console.log('isSameTime: ', isSameTime);
                const getTheDay = getDay(new Date());
                console.log('getTheDay: ', getTheDay);
                if ((checkIsBeforeEndTime && checkIsAfterStartTime) || isSameTime) {
                  this.presentCabinentNotify();
                } else {
                  this.closeModal();
                }
              }
            } else {
              this.closeModal();
            }
          }

      });
    }
  }
  async presentCabinentNotify() {
    const modal = await this.modalController.create({
      component: CabinetNotifyComponent,
      cssClass: 'biz-modal-class-type-a modal-wrapper-with-232px-height',
      backdropDismiss: true,
      componentProps: {
        notifyType: 'typeA'
      },
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    console.log(data);
    const { dismissed, renita, veziProgram } = data;
    if (dismissed && veziProgram) {
      this.presentCabinent();
    }
  }

  async presentCabinent() {
    const modal = await this.modalController.create({
      component: CabinetComponent,
      cssClass: 'biz-modal-class width-md-100',
      backdropDismiss: true,
      componentProps: {},
    });
    await modal.present();
  }

  ngOnDestroy() {
    unsubscriberHelper(this.getCabinets$);
    unsubscriberHelper(this.getCabinetScheldules$);
    unsubscriberHelper(this.subscriptions);
  }

}

