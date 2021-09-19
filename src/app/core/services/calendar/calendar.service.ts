import { appointmentEndpoints } from './../../configs/endpoints';
import { RequestService } from './../request/request.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  selectedDate: BehaviorSubject<string> = new BehaviorSubject(null);
  appointments$: BehaviorSubject<[]> = new BehaviorSubject([]);
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
      const physician = e.physicians[1];
      const obj = {
        startDate: new Date(),
        endDate: new Date(),
        physicianUID: physician.physicianUID
      };
      // console.log(e);
      return this.reqS.post(appointmentEndpoints.getAppointment, obj).subscribe((res: any) =>{
        /* console.log(res);
        console.log(res); */
        this.appointments$.next(res.appointments);
      });
    });
  }
}
