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
    this.selectedDate.subscribe(e =>{
      console.log(e);
      const start = new Date(e);
      start.setHours(7);
      const end = new Date(e);
      end.setHours(21);
      const obj ={
        startDate: start,
        endDate: end,
        physicianUID: '6e3c43b9-0a07-4029-b707-ca3570916ad5'
      };
      this.reqS.post(appointmentEndpoints.getAppointment, obj).subscribe((res: any) =>{
        console.log(res);
        this.appointments$.next(res);
      });
    });
   }

  getUserPhysicians(){
    return this.reqS.get(appointmentEndpoints.getUserPhysicians);

  }

  async  getAppointments(){

    const phy: any = await this.getUserPhysicians().toPromise();
    console.log(phy.physicians);
    const obj = {
      startDate: new Date('2021-07-03T12:09:40.163Z'),
      endDate: new Date('2021-09-03T12:09:40.163Z'),
      physicianUID: phy.physicians[7].physicianUID
    };
    return this.reqS.post(appointmentEndpoints.getAppointment, obj).subscribe((res: any) =>{
      console.log(res);
      console.log(res);
      this.appointments$.next(res);
    });
  }

  colorCode(code){
    switch (code) {
      case '1CY':
        return 'cabinet-confirmed-v1';
        break;
      case '2CY':
        return 'cabinet-confirmed-v2';
        break;
      case '1OY':
        return 'online-confirmed-v1';
        break;
      case '2OY':
        return 'online-confirmed-v2';
        break;
      case '1CN':
        return 'cabinet-not-confirmed-v1';
        break;
      case '2CN':
        return 'cabinet-not-confirmed-v2';
        break;
      case '1ON':
        return 'online-not-confirmed-v1';
        break;
      case '2ON':
        return 'online-not-confirmed-v2';
        break;
      case '1N':
        return 'note-v1';
        break;
      case '2N':
        return 'note-v2';
        break;
      case '1WM':
        return 'warning-v1';
        break;
      case '2WM':
        return 'warning-v2';
        break;
      case '1NUL':
        return 'cancelled-v1';
      case '2NUL':
        return 'cancelled-v2';
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
