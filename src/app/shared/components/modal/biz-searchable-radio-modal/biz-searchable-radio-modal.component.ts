import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { LoadingController, ModalController } from '@ionic/angular';
import { addHours, addMinutes, format, getDay, isAfter, isBefore, isEqual, startOfDay } from 'date-fns';
import { get, find } from 'lodash';
import { BehaviorSubject, forkJoin, Subscription } from 'rxjs';
import { appointmentEndpoints, cabinet } from 'src/app/core/configs/endpoints';
import { dayInAWeekWithDate } from 'src/app/core/helpers/date.helper';
import { unsubscriberHelper } from 'src/app/core/helpers/unsubscriber.helper';
import { GetCabinetSchedulesResponseModel } from 'src/app/core/models/getCabinetSchedules.response.model';
import { RequestService } from 'src/app/core/services/request/request.service';
import { ToastService } from 'src/app/core/services/toast/toast.service';
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
  @Input() startTime: Date;
  @Input() endTime: Date;
  @Input() @Input() set options(opts: Array<IonRadioInputOption>) {
    this.opts = opts ? opts : [];
    this.updateItems();
  }
  @Input() checkList!: any;
  @Input() locationUID: string;
  isCabinetAvailable = false;
  getCabinets$: Subscription;
  getCabinetScheldules$: Subscription;
  getAppointments$: Subscription;
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
  appointmentEndpointData$: BehaviorSubject<any> = new BehaviorSubject<any>({});
  cabinetScheldulesEndpointData$: BehaviorSubject<any> = new BehaviorSubject<any>([]);

  public subscriptions = new Subscription();

  private opts: Array<IonRadioInputOption> = [];

  constructor(
    private fb: FormBuilder,
    private modalController: ModalController,
    private cdRef: ChangeDetectorRef,
    private reqService: RequestService,
    public loadingController: LoadingController,
    private toastService: ToastService,
  ) {}
  ngOnInit(): void {
    this.updateItems();
  }
  closeModal() {
    this.modalController.dismiss({
      dismissed: true,
      radioValue: this.isCabinetAvailable ? this.controlValue : ' ',
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
      const getSchedulePayload = {
        // physicianUID: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        cabinetUID, // '3fa85f64-5717-4562-b3fc-2c963f66afa6'
      };

    const payload = {
      locationUID: this.locationUID,// this.options.find((v: any) => v.id === this.controlValue).locationUID,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      StartDate: format(
        startOfDay(dayInAWeekWithDate(new Date())[0])
        , 'yyyy-MM-dd HH:mm'),
      // eslint-disable-next-line @typescript-eslint/naming-convention
      EndDate: format(
        startOfDay(dayInAWeekWithDate(new Date())[6])
        , 'yyyy-MM-dd HH:mm'),
      // eslint-disable-next-line @typescript-eslint/naming-convention
      CabinetUID: this.controlValue// 'ccedb51b-f381-4f89-924c-516af87411fb'

    };


      this.getCabinetScheldules$ = forkJoin([
        this.reqService.post<Array<GetCabinetSchedulesResponseModel>>(
          cabinet.getCabinetsSchedules
          , getSchedulePayload),
        this.reqService.post(appointmentEndpoints.getAppointment, payload)
      ]).subscribe(
        (res: any) => {
          console.log(res);
          loading.dismiss();
        },
        _err => {
          loading.dismiss();
        }
      );

    }
  }
  async _callCabinetProcess(cabinetUID: string = this.controlValue) {

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
          // dismiss loader
            loading.dismiss();
          if (resps) {
            /*  */
            if (resps.length > 0) {
              this.cabinetOfEvent = resps.map(
                (v: GetCabinetSchedulesResponseModel) => ({
                  ...v,
                  cabinetTime: startOfDay(dayInAWeekWithDate(new Date())[v.dayID]),
                })
              ) .map((w: GetCabinetSchedulesResponseModel) => ({
                    ...w,
                    startTime: addMinutes(addHours(startOfDay(w.cabinetTime), w.startHour), w.startMin),
                    endTime: addMinutes(addHours(startOfDay(w.cabinetTime), w.endHour), w.endMin),
                })
              );

              console.log('cabinetOfEvent', this.cabinetOfEvent);

              const checkCabinetavailability = this.cabinetOfEvent.filter(
                (t: GetCabinetSchedulesResponseModel) => ((this.startTime >= t.startTime && this.endTime < t.endTime))
              );
              console.log('checkCabinetavailability: ', checkCabinetavailability);
              if (checkCabinetavailability.length > 0) {
                this.isCabinetAvailable = true;
                this.closeModal();
              } else {
                this.isCabinetAvailable = false;
                this.presentCabinentNotify();
              }
            } else {
              this.isCabinetAvailable = true;
              this.closeModal();
            }
          }

        },
        _error => {
          // dismiss loader
          loading.dismiss();
          // eslint-disable-next-line max-len
          this.toastService.presentToastWithDurationDismiss('Unable check cabinet at this time. Please check your network and try again. C18');
        }

      );
    }
  }
  async presentCabinentNotify() {
    const modal = await this.modalController.create({
      component: CabinetNotifyComponent,
      cssClass: 'biz-modal-class-type-a modal-wrapper-with-232px-height',
      backdropDismiss: true,
      componentProps: {
        notifyType: 'typeA',
        cabinetName: this.cabinetLabel,
      },
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    const { dismissed, renita, veziProgram } = data;
    if (dismissed && veziProgram) {
      this.getApointments();
    }
  }

  async presentCabinent(cabinetData: any) {
    const modal = await this.modalController.create({
      component: CabinetComponent,
      cssClass: 'biz-modal-class width-md-100',
      backdropDismiss: true,
      componentProps: {
        cabinetData,
        cabinetName: this.cabinetLabel,
      },
    });
    await modal.present();
  }
  async getApointments() {

    const loading = await this.loadingController.create({
            spinner: 'crescent',
            mode: 'md',
            // duration: 2000,
            message: 'Checking Cabinet...',
            translucent: true,
            cssClass: 'custom-class custom-loading'
        });
    await loading.present();

    const startOfTheWeekDate = startOfDay(dayInAWeekWithDate(new Date())[0]);
    const endOfTheWeekDate = startOfDay(dayInAWeekWithDate(new Date())[6]);

    const payload = {
      locationUID: '4cbb3c39-8be6-46d7-b334-1f7325e86a5e',// this.options.find((v: any) => v.id === this.controlValue).locationUID,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      StartDate: format(startOfTheWeekDate, 'yyyy-MM-dd HH:mm'),
      // eslint-disable-next-line @typescript-eslint/naming-convention
      EndDate: format(endOfTheWeekDate, 'yyyy-MM-dd HH:mm'),
      // eslint-disable-next-line @typescript-eslint/naming-convention
      CabinetUID: this.controlValue// 'ccedb51b-f381-4f89-924c-516af87411fb'

    };
    this.getAppointments$ = this.reqService.post(
      appointmentEndpoints.getAppointment,
      payload,
    )
      .subscribe(
        (d: any) => {
          console.log('getAppointments$: ', d);
          // dismiss loader
            loading.dismiss();
          this.presentCabinent(d);
        },
        _err => {
          // dismiss loader
          loading.dismiss();
          // eslint-disable-next-line max-len
          this.toastService.presentToastWithDurationDismiss('Unable to get appoiintements for this cabinet at this time. Please check your network and try again. C17');
        }
      );
  }

  get cabinetLabel(): string {
    return this.items.find((v: any) => v.id === this.controlValue).label || '';
  }

  ngOnDestroy() {
    unsubscriberHelper(this.getCabinets$);
    unsubscriberHelper(this.getCabinetScheldules$);
    unsubscriberHelper(this.subscriptions);
  }

}

