import { AppointmentResponse } from './../../models/appointment.interface';
import { appointmentEndpoints } from './../../configs/endpoints';
import { RequestService } from './../request/request.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { addBusinessDays, endOfMonth, endOfWeek, endOfYear, startOfMonth, startOfWeek, startOfYear, subBusinessDays } from 'date-fns';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  selectedDate: BehaviorSubject<string> = new BehaviorSubject(null);
  selectedPath: BehaviorSubject<string> = new BehaviorSubject(null);
  appointments$: BehaviorSubject<AppointmentResponse> = new BehaviorSubject(null);
  selectedMonth: BehaviorSubject<string> = new BehaviorSubject('');
  showPicker: BehaviorSubject<boolean> = new BehaviorSubject(false);
  constructor(private reqS: RequestService, private activatedRoute: ActivatedRoute) {
    this.selectedDate.subscribe(e =>{
      console.log(e);
      this.fetchCalendarAppointment(e);
    });

   }

  getUserPhysicians(){
    return this.reqS.get(appointmentEndpoints.getUserPhysicians);

  }
  fetchCalendarAppointment(selectedDate = null){
    this.selectedPath.subscribe(path =>{
      console.log(path);

      const obj: any = {
        physicianUID: '6e3c43b9-0a07-4029-b707-ca3570916ad5'
      };
      if(path !== null){
        console.log(path);
        if(path === 'lista'){
          const start = selectedDate ? new Date(selectedDate) : startOfYear(new Date());
          const end = selectedDate ? new Date(selectedDate) : endOfYear(new Date());
          obj.startDay = start;
          obj.endDate = end;
        }
        else if(path === 'zi'){
          const start = selectedDate ? new Date(selectedDate) : new Date();
          start.setHours(7,0,0);
          const end = selectedDate ? new Date(selectedDate) : new Date();;
          end.setHours(21,0,0);
          obj.startDate = start;
          obj.endDate = end;
        }else if(path === 'luna'){
          const start = selectedDate ? startOfMonth(new Date(selectedDate)) : startOfMonth(new Date());
          const end = selectedDate ? endOfMonth(new Date(selectedDate)): endOfMonth(new Date());
          obj.startDay = start;
          obj.endDate = end;
        }else if(path === 'saptamana'){
          console.log(path);
          const start = selectedDate ? startOfWeek(new Date(selectedDate)) : startOfWeek(new Date());
          const end = selectedDate ? endOfWeek(new Date(selectedDate)) : endOfWeek(new Date()) ;
          obj.StartDate = start;
          obj.EndDate = end;
        }else if(path === 'zile-lucratoare'){
          // console.log(subBusinessDays(endOfWeek(new Date()),1), path);
          const start = selectedDate ? addBusinessDays(startOfWeek(new Date(selectedDate)),1) : addBusinessDays(startOfWeek(new Date()),1);
          const end = selectedDate ? subBusinessDays(endOfWeek(new Date(selectedDate)),1) : subBusinessDays(endOfWeek(new Date()),1) ;
          obj.startDate = start;
          obj.endDate = end;
        }
        this.getAppointments(obj);

      }

    });
  }
  async  getAppointments(data = null){
    console.log(data);
    if(data !== null){
      const phy: any = await this.getUserPhysicians().toPromise();
      const obj: any = {
        physicianUID: phy.physicians[7].physicianUID,
        ...data
      };

      // console.log(obj);
      return this.reqS.post(appointmentEndpoints.getAppointment, obj).subscribe((res: any) =>{
        // console.log(res);
        this.appointments$.next(res);
      });

    }
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
