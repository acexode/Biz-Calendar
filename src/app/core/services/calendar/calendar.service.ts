import { AppointmenetResponse } from './../../models/appointment.interface';
import { appointmentEndpoints } from './../../configs/endpoints';
import { RequestService } from './../request/request.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  selectedDate: BehaviorSubject<string> = new BehaviorSubject(null);
  appointments$: BehaviorSubject<AppointmenetResponse> = new BehaviorSubject(null);
  selectedMonth: BehaviorSubject<string> = new BehaviorSubject('');
  showPicker: BehaviorSubject<boolean> = new BehaviorSubject(false);
  constructor(private reqS: RequestService) {
    this.getAppointments();
   }

  getUserPhysicians(){
    return this.reqS.get(appointmentEndpoints.getUserPhysicians);

  }
  getAppointments(){
    // to be removed later
    return this.getUserPhysicians().subscribe((e: any) =>{
      const physician = e.physicians[0];
      const obj = {
        startDate: new Date('2021-07-03T12:09:40.163Z'),
        endDate: new Date('2021-09-03T12:09:40.163Z'),
        physicianUID: '6e3c43b9-0a07-4029-b707-ca3570916ad5'
      };
      console.log(e);
      return this.reqS.post(appointmentEndpoints.getAppointment, obj).subscribe((res: any) =>{
        console.log(res);
        console.log(res);
        this.appointments$.next(res);
      });
    });
  }
}
