import { AppointmentResponse } from './../../models/appointment.interface';
import { appointmentEndpoints } from './../../configs/endpoints';
import { RequestService } from './../request/request.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  selectedDate: BehaviorSubject<string> = new BehaviorSubject(null);
  appointments$: BehaviorSubject<AppointmentResponse> = new BehaviorSubject(null);
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
    // return this.getUserPhysicians().subscribe((e: any) =>{
    //   const physician = e.physicians[0];
      const obj = {
        startDate: new Date('2021-07-03T12:09:40.163Z'),
        endDate: new Date('2021-09-03T12:09:40.163Z'),
        physicianUID: '6e3c43b9-0a07-4029-b707-ca3570916ad5'
      };
    //   console.log(e);

    // });
    return this.reqS.post(appointmentEndpoints.getAppointment, obj).subscribe((res: any) =>{
      console.log(res);
      console.log(res);
      this.appointments$.next(res);
    });
  }
  getAppointmentEvent(){
    const obj = {
      startDate: new Date('2021-07-03T12:09:40.163Z'),
      endDate: new Date('2021-09-31T12:09:40.163Z'),
      physicianUID: '6e3c43b9-0a07-4029-b707-ca3570916ad5'
    };
    return this.reqS.post(appointmentEndpoints.getAppointment, obj);
  }
  colorCode(code){
    switch (code) {
      case '1CY':
        return 'green-bg';
        break;
      case '1OY':
        return 'blue-bg';
        break;
      case '1CN':
        return 'green-pattern';
        break;
      case '1ON':
        return 'blue-pattern';
        break;
      case '1N':
        return 'note-bg';
        break;
      case '1WM':
        return 'warning-bg';
        break;
      case '1NUL':
        return 'cancelled-bg';
    }
  }
  iconCode(code){
    switch (code) {
      case 1:
        return 'partially-paid';
        break;
      case 2:
        return 'green-bg';
        break;
      case 3:
         return 'notificare';
        break;
      case 4:
        return 'cnas';
        break;
      case 5:
        return 'nou';
        break;
      case 6:
        return 'recurrenta';
        break;
      case 7:
        return 'note';
        break;
      case 8:
        return 'cancelled';
    }
  }
}
