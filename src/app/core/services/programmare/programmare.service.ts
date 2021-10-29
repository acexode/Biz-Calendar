import { Injectable } from '@angular/core';
import { startOfDay, addMinutes, addHours, format } from 'date-fns';
import { BehaviorSubject, forkJoin, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { cabinet, physicians, appointmentEndpoints } from '../../configs/endpoints';
import { dayInAWeekWithDate } from '../../helpers/date.helper';
import { GetCabinetSchedulesResponseModel } from '../../models/getCabinetSchedules.response.model';
import { ProgrammareDateDataUpdate } from '../../models/programmareDateDataUpdate-model';
import { RequestService } from '../request/request.service';

@Injectable({
  providedIn: 'root'
})
export class ProgrammareService {
  appointmentEndpointData$: BehaviorSubject<any> = new BehaviorSubject<any>({});
  cabinetScheldulesEndpointData$: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  getPhysicianScheduleEndPointData$: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  duration$: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  startTime$: BehaviorSubject<Date> = new BehaviorSubject<Date>(null);
  endTime$: BehaviorSubject<Date> = new BehaviorSubject<Date>(null);
  physicianUID$: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  programmareDateDataUpdate$: BehaviorSubject<ProgrammareDateDataUpdate>
    = new BehaviorSubject({
      isUpdate: false,
      time: null,
      date: null,
      cabinetUID: ''
    });

  constructor(
    private reqService: RequestService,
  ) { }

  getCabinetSchedule(
    getSchedulePayload: any,
    getPhysicianSchedulePayload: any,
    appointmentPayload: any,
    dayInAWeekWithDate$: Array<Date> = dayInAWeekWithDate(new Date()),
    startTime: Date,
    endTime: Date,
    physicianUID: string,
    duration: number,
  ) {
    return forkJoin(
      [
        this.reqService.post<Array<GetCabinetSchedulesResponseModel>>(
          cabinet.getCabinetsSchedules
          , getSchedulePayload),
        this.reqService.post(physicians.getPhysicianSchedule, getPhysicianSchedulePayload),
        this.reqService.post(appointmentEndpoints.getAppointment, appointmentPayload)
      ]
    ).pipe(
      tap((res: any) => {
        this.cabinetScheldulesEndpointData$.next(
          res[0].map(
            (v: any) => ({
              ...v,
              cabinetDate: startOfDay(dayInAWeekWithDate$[v.dayID]),
            })
          ).map((q: any) => ({
            ...q,
            startTime: addMinutes(addHours(startOfDay(q.cabinetDate), q.startHour), q.startMin),
            endTime: addMinutes(addHours(startOfDay(q.cabinetDate), q.endHour), q.endMin),
          })
          )
        );

        // getPhysicianScheduleEndPointData
        this.getPhysicianScheduleEndPointData$.next(
          res[1].map((w: any) => ({
            ...w,
            date: startOfDay(new Date(w.date)),
            endTime: addHours(startOfDay(new Date(w.date)), parseInt(w.end, 10)),
            startTime: addHours(startOfDay(new Date(w.date)), parseInt(w.start, 10)),
          })
          )
        );
        /*  */
        this.appointmentEndpointData$.next(
          {
            ...res[2],
            appointments: res[2]?.appointments.map((q: any) => ({
              ...q,
              startTime: new Date(q.startTime),
              endTime: new Date(q.endTime),
            }))

          }
        );

        // set otherData
        this.saveDataForUse({
          startTime,
          endTime,
          physicianUID,
          duration
        });

      })
    );
  }
  runCheckProcess(
    startTime: Date = this.startTime$.value,
    endTime: Date = this.endTime$.value,
    physicianUID: string = this.physicianUID$.value,
  ) {

    // if exist data it means user can't select this cabinet
    const checkCabinetAvailability = this.cabinetScheldulesEndpointData$.value.filter(
       (t: any) => ((startTime >= t.startTime && endTime < t.endTime) && physicianUID !== t.physicianUID)
    );

    // check if physician is available at that hour =>  then user can select this cabinet
    const checkPhysicianScheduleAvailability = this.getPhysicianScheduleEndPointData$.value.filter(
      (t: any) => ((startTime >= t.startTime && endTime < t.endTime))
    );

    // check if an appointment exist at that hour => if exist user can't select this cabinet
    const checkAppointmentAvailability = this.appointmentEndpointData$.value.appointments.filter(
      (t: any) => ((startTime >= t.startTime && endTime < t.endTime))
    );

    if (
      (!(checkCabinetAvailability.length > 0)) &&
      (checkPhysicianScheduleAvailability.length > 0)
      &&
      (!(checkAppointmentAvailability.length > 0))
    ) {
      return true;
    } else {
      return false;
    }
  }
  setDuration(duration: number) {
    this.duration$.next(duration);
  }
  saveDataForUse({
          startTime,
          endTime,
          duration,
          physicianUID
  }) {

    this.duration$.next(duration);
    this.startTime$.next(startTime);
    this.endTime$.next(endTime);
    this.physicianUID$.next(physicianUID);

  }

  timeFormat(time: Date) {
    return format(new Date(time), 'HH:mm');
  }
  formatDate(date: Date) {
    return format(new Date(date), 'yyyy-MM-dd');
  }
  updateProgrammareDateData(date: Date, cabinetUID: string) {
    this.programmareDateDataUpdate$.next({
      isUpdate: true,
      time: this.timeFormat(date),
      date: this.formatDate(date),
      cabinetUID,
    });
  }
  getProgrammareDateData(): Observable<any> {
    return this.programmareDateDataUpdate$.asObservable();
  }
}
