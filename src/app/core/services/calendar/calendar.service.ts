import { location, cabinet } from './../../configs/endpoints';
/* eslint-disable @typescript-eslint/naming-convention */
import { AuthService } from './../auth/auth.service';
import { Appointment, AppointmentResponse } from './../../models/appointment.interface';
import { appointmentEndpoints, authEndpoints } from './../../configs/endpoints';
import { RequestService } from './../request/request.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { addBusinessDays, endOfMonth, endOfWeek, endOfYear, startOfMonth, startOfWeek,
  startOfYear, subBusinessDays, startOfDay, addDays } from 'date-fns';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  selectedDate: BehaviorSubject<string> = new BehaviorSubject(null);
  selectedPath: BehaviorSubject<string> = new BehaviorSubject(null);
  filterLocation: BehaviorSubject<string> = new BehaviorSubject(null);
  filterProgram: BehaviorSubject<string> = new BehaviorSubject(null);
  appointments$: BehaviorSubject<AppointmentResponse> = new BehaviorSubject(null);
  cabinetAppointment$: BehaviorSubject<AppointmentResponse> = new BehaviorSubject(null);
  cabinetQuery$: BehaviorSubject<any> = new BehaviorSubject(null);
  eventLists$: BehaviorSubject<Appointment[]> = new BehaviorSubject([]);
  selectedMonth: BehaviorSubject<string> = new BehaviorSubject('');
  showPicker: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private reqS: RequestService, private activatedRoute: ActivatedRoute, private authS: AuthService) {
    // console.log(appStartHour, appEndHour);
    this.selectedDate.subscribe(e =>{
      const {appStartHour, appEndHour} = JSON.parse(localStorage.getItem('workHours'));
      // console.log(e);
      if(e !== null){
        this.fetchCalendarAppointment(e, appStartHour, appEndHour);
      }else{
        // console.log('new Date');
        this.fetchCalendarAppointment(new Date(), appStartHour, appEndHour);
      }
    });
    this.cabinetQuery$.subscribe(q =>{
      console.log(q);
      if(q !== null){
        this.getCabinetAppointment(q);
      }
    });
   }

  getUserPhysicians(){
    return this.reqS.get(appointmentEndpoints.getUserPhysicians);
  }
  fetchCalendarAppointment(selectedDate, appStartHour, appEndHour){
    // console.log(selectedDate);
    this.selectedPath.subscribe(path =>{
      // console.log(path);
      const obj: any = {
        physicianUID: '6e3c43b9-0a07-4029-b707-ca3570916ad5'
      };
      if(path !== null){
        if(path === 'lista'){
          obj.StartDate = startOfYear(new Date());
          obj.EndDate = endOfYear(new Date());
          this.getAppointments(obj);
        }
        else if(path === 'zi'){
          console.log(selectedDate);
          const start = selectedDate ? new Date(selectedDate) : new Date();
          const end = selectedDate ? new Date(selectedDate) : new Date();;
          start.setHours(appStartHour,0,0);
          end.setHours(appEndHour,0,0);
          obj.StartDate = start;
          obj.EndDate = end;
          this.getAppointments(obj);
        }else if(path === 'luna'){
          const start = selectedDate ? startOfMonth(new Date(selectedDate)) : startOfMonth(new Date());
          const end = selectedDate ? endOfMonth(new Date(selectedDate)): endOfMonth(new Date());
          start.setHours(appStartHour,0,0);
          end.setHours(appEndHour,0,0);
          obj.StartDate = start;
          obj.EndDate = end;
          this.getAppointments(obj);
        }else if(path === 'saptamana'){
          const start = selectedDate ? startOfWeek(new Date(selectedDate)) : startOfWeek(new Date());
          const end = selectedDate ? endOfWeek(new Date(selectedDate)) : endOfWeek(new Date()) ;
          start.setHours(appStartHour,0,0);
          end.setHours(appEndHour,0,0);
          obj.StartDate = start;
          obj.EndDate = end;
          this.getAppointments(obj);
        }else if(path === 'zile-lucratoare'){
          const start = selectedDate ? addBusinessDays(startOfWeek(new Date(selectedDate)),1) : addBusinessDays(startOfWeek(new Date()),1);
          const end = selectedDate ? subBusinessDays(endOfWeek(new Date(selectedDate)),1) : subBusinessDays(endOfWeek(new Date()),1) ;
          start.setHours(appStartHour,0,0);
          end.setHours(appEndHour,0,0);
          obj.StartDate = start;
          obj.EndDate = end;
          this.getAppointments(obj);
        }
        // console.log(obj);


      }

    });
  }
  async  getAppointments(data = null){
    // console.log(data);
    if(data !== null){
      const phy: any = await this.getUserPhysicians().toPromise();
      const obj: any = {
        physicianUID: phy.physicians[7].physicianUID,
        ...data
      };

      // console.log(obj);
      return this.reqS.post(appointmentEndpoints.getAppointment, obj)
      .subscribe((res: any) =>{
        // console.log(res);
        this.appointments$.next(res);
        this.eventLists$.next(res.appointments);
      });

    }
  }

  getCabinetAppointment(query, date= null){
    const obj = {
      StartDate: date !== null ? startOfDay(new Date(date)) : startOfDay(new Date()) ,
      EndDate:  date !== null ? addDays(new Date(date), 1) : addDays(new Date(), 1),
      ...query
    };
    return this.reqS.post(appointmentEndpoints.getAppointment, obj).subscribe((res: any) =>{
      console.log(res);
      this.cabinetAppointment$.next(res);
    });
  }
  getLocations(){
    const cabinets = this.reqS.get(cabinet.getCabinets);
    const locations = this.reqS.get(location.getLocations);
    return this.reqS.get(location.getLocations);
  }

  colorCode(code, view = 'list'){
    switch (code) {
      case '1CY':
        return  view === 'list' ?  'cabinet-confirmed-v1' : 'cabinet-confirmed-v1-weekmonth' ;
        break;
      case '2CY':
        return view === 'list' ? 'cabinet-confirmed-v2': 'cabinet-confirmed-v2-weekMonth';
        break;
      case '1OY':
        return view === 'list' ? 'online-confirmed-v1' : 'online-confirmed-v1-weekmonth';
        break;
      case '2OY':
        return view === 'list' ? 'online-confirmed-v2' : 'online-confirmed-v2-weekmonth';
        break;
      case '1CN':
        return view === 'list' ? 'cabinet-not-confirmed-v1' : 'cabinet-not-confirmed-v1-weekmonth';
        break;
      case '2CN':
        return view === 'list' ? 'cabinet-not-confirmed-v2': 'cabinet-not-confirmed-v2-weekmonth';
        break;
      case '1ON':
        return  view === 'list' ? 'online-not-confirmed-v1' : 'online-not-confirmed-v1-weekMonth';
        break;
      case '2ON':
        return view === 'list' ? 'online-not-confirmed-v2': 'online-not-confirmed-v2-weekMonth';
        break;
      case '1N':
        return 'note-v1';
        break;
      case '2N':
        return 'note-v2';
        break;
      case '1WM':
        return view === 'list' ? 'warning-v1': 'warning-v1-weekMonth';
        break;
      case '2WM':
        return view === 'list' ? 'warning-v2': 'warning-v2-weekMonth';
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
        return 'recurenta';
        break;
      case 7:
        return 'note';
        break;
      case 8:
        return 'cancelled';
    }
  }
}
