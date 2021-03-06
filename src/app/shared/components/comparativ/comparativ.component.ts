/* eslint-disable @typescript-eslint/naming-convention */
import { PlatformService } from './../../../core/services/platform/platform.service';
import { appointment } from './../../../core/configs/endpoints';
import { CalendarService } from './../../../core/services/calendar/calendar.service';
import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import {
  CalendarEvent,
  CalendarEventTimesChangedEvent,
} from 'angular-calendar';
import { addHours, differenceInHours, isSameDay, startOfDay } from 'date-fns';
import { User } from './day-view-scheduler.component';

const colors: any = {
  green: {
    primary: '#D5EED1',
    secondary: '#2EA81B',
  },
  blue: {
    primary: '#D6E9FE',
    secondary: '#3093F8',
  },
  yellow: {
    primary: '#e7d597',
    secondary: '#FFC715',
  },
  orange: {
    primary: '#ecb986',
    secondary: '#F77C00',
  },
  transparent: {
    primary: 'white',
    secondary: 'white',
  },
};


const users: User[] = [
  {
      id: 0,
      name: 'D.A.',
      title: 'Dna.',
      color: colors.yellow
  },
  {
      id: 1,
      name: 'I.A.',
      title: 'Dna.',
      color: colors.yellow
  },
  {
      id: 2,
      name: 'L.B.',
      title: 'Dna.',
      color: colors.yellow
  },
  {
      id: 3,
      name: 'E.C.D.',
      title: 'Dna.',
      color: colors.blue
  },
  {
      id: 4,
      name: 'A.P.D.',
      title: 'Dna.',
      color: colors.yellow
  },
  ];
@Component({
  selector: 'app-comparativ',
  // changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './comparativ.component.html',
  styleUrls: ['./comparativ.component.scss'],
})
export class ComparativComponent implements OnInit {


  viewDate = new Date();
  emptyPlaceHolder = [
    {
      id: 0,
      name: '',
      title: '',
      color: '',
    }
  ];
  users = [];
  allUsers = [];
  numDisplay = 5;
  currentIndex = 0;
  isMobile = false;
  events: CalendarEvent[] = [];
  allEvents: CalendarEvent[] = [];
  appointmentResponse: any;
  schedules: any;
  holidays: any;
  constructor(private calS: CalendarService,private cdref: ChangeDetectorRef, private pS: PlatformService){

  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    event.start = newStart;
    event.end = newEnd;
    this.events = [...this.events];
  }

  userChanged({ event, newUser }) {
    event.color = newUser.color;
    event.meta.user = newUser;
    this.events = [...this.events];
  }

  ngOnInit() {
    this.pS.isDesktopWidth$.subscribe(e =>{
      this.isMobile = e ? false : true;
      this.numDisplay = e ? 10 : 5;
    });
    this.calS.selectedDate.subscribe(d =>{
      console.log(d);
      console.log('LOCATION', this.calS.subjectValue);
      const val = this.calS.subjectValue;
      if(d !== null){
        this.calS.getCabinetAppointment({
          LocationUID: val?.id
        }, new Date(d));
        this.viewDate = new Date(d);
      }
      this.loadEvent();
      // console.log(d);
    });
    this.calS.filterProgram.subscribe(p =>{
      console.log(p);
      if(p !== null){
        const events = this.appointmentResponse.appointments
        .filter(lname => lname[p] !== null );
        this.events = this.mapAppointments(events, p);
        const notEmpty = this.mapProgram(events, p).length;
        this.users = notEmpty > 0 ? this.mapProgram(events, p) : this.emptyPlaceHolder;
        // console.log(events, this.users);
        this.cdref.detectChanges();
      }
    });
    this.calS.filterLocation.subscribe(loc =>{
      this.loadEvent();
    });
    // this.loadEvent(this.viewDate);
  }
  loadEvent(){
    this.calS.cabinetAppointment$.subscribe((e: any) =>{
      // console.log(e);
      this.schedules = e?.schedules ? e?.schedules : [];
      this.appointmentResponse = e;
      if(e !== null){
        this.currentIndex = 0;
        this.allEvents = this.mapAppointments(e.appointments, 'physicianName');
        this.allUsers = this.mapProgram(e.appointments, 'physicianName');
      // console.log(this.allUsers);
      if(this.allEvents.length > 0){
        this.events = this.allEvents.slice(this.currentIndex , this.numDisplay);
        this.users = this.allUsers.slice(this.currentIndex , this.numDisplay);
        this.currentIndex = this.numDisplay;
        this.calS.eventCounts.next(this.allEvents.length);
        // this.cdref.detectChanges();
        // console.log(this.allEvents);
        // console.log(this.users);
        // console.log(this.events);

      }else{
        // console.log('EMPTY');
        this.events = [];
        this.users = this.emptyPlaceHolder;
      }
      }
    });
  }
  mapAppointments(appointments, field){
    console.log(field);
    if(appointments.length > 0){
      const eventList = appointments.filter(ap => ap[field] !== null).map((apt, i) => (
        {
          title: 'hello',
          color:  {
            secondary: this.calS.colorCode(apt.colorCode, 'weekMonth'),
            primary: this.calS.colorCode(apt.colorCode, 'weekMonth'),
          },
          start: new Date(apt.startTime),
          end: new Date(apt.endTime),
          meta: {
            user: {
              id: i,
              name: apt[field],
             color: colors.yellow,
            },
          },
          resizable: {
            beforeStart: true,
            afterEnd: true,
          },
          draggable: true,
        }
      ));
      console.log(eventList);
        return eventList;

    }else{
      return [];
    }
  }
  setBg(d){

  const hours = new Date(d).getHours();
  if(this.holidays?.length){
    this.holidays.forEach(hol =>{
      const diff = differenceInHours(hol.startDay, hol.endDate);
      const isSame = isSameDay(hol.startDate, d);
      if(isSame){
        return 'holidays';
      }
    });
  }else if(this.schedules?.length > 0){
    const breakTime = this.schedules?.filter(e => e.isBreakTime)[0];
    const allPrivate = [];
    const allCnas = [];
    const allBreak = [parseInt(breakTime.start,10), parseInt(breakTime.end,10)-1];
    this.schedules?.forEach(e => {
      if(e.isPrivate && !e.isBreak){
        allPrivate.push(...this.range(parseInt(e.start, 10), parseInt(e.end, 10)));
      }else if(!e.isPrivate && !e.isBreak){
        allCnas.push(...this.range(parseInt(e.start, 10), parseInt(e.end, 10)));
      }
    });
    if(allBreak.includes(hours) ){
      return '';
    }else  if(allPrivate.includes(hours)){
      return 'online-not-confirmed-v2 no-border';
    }else {
      //if(allCnas.includes(hours))
      return 'cabinet-not-confirmed-v1 no-border';
    }

  }

}

mapProgram(appointments, field){
  const distinctUser = [];
  const filterdUser =[];
  appointments.filter(ap => ap[field] !== null).forEach((apt,i) =>
  {
   if(!distinctUser.includes(apt.uid)){
     distinctUser.push(apt.uid);
     filterdUser.push({
       id: i,
       name: this.acronym(apt[field], field),
       title: this.acronym(apt[field], field),
       color: colors.yellow,
     });
   }
 }
 );
 return filterdUser;
}
range(start, end, step = 1) {
  const output = [];
  if (typeof end === 'undefined') {
    end = start;
    start = 0;
  }
  for (let i = start; i < end; i += step) {
    output.push(i);
  }
  return output;
};
  acronym(text, field) {
    // console.log(text);
    if(text === null){
      return '';

    }
    if(field === 'physicianName'){
      const res =  text
        .split(/\s/)
        .reduce((accumulator, word) => accumulator + word.charAt(0) + '.', '');
      return res.slice(0,res.length-1).replace('-.', '');
    }else{
      return text.slice(0,3);
    }
  }
  left(){
    if(this.currentIndex !== 0){
      // console.log(this.currentIndex);
      this.currentIndex -= this.numDisplay;
      if(this.currentIndex > 0){
        // console.log(this.currentIndex, (this.currentIndex + this.numDisplay));
        this.events = this.allEvents.slice(this.currentIndex - this.numDisplay , (this.currentIndex));
        this.users = this.allUsers.slice(this.currentIndex - this.numDisplay , (this.currentIndex));

      }
      // console.log(this.currentIndex);
    }
  }
  right(){
    // console.log(this.allUsers);
    if(this.currentIndex < this.allUsers.length){
      this.currentIndex = this.currentIndex === 0 ? this.numDisplay : this.currentIndex;
      this.events = this.allEvents?.slice(this.currentIndex , (this.currentIndex + this.numDisplay));
      this.users = this.allUsers?.slice(this.currentIndex , (this.currentIndex + this.numDisplay));
      // console.log(this.currentIndex);
      this.currentIndex += this.numDisplay;
      // console.log(this.currentIndex);

    }
  }

}
