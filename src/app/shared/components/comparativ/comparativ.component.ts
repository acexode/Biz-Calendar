import { appointment } from './../../../core/configs/endpoints';
import { CalendarService } from './../../../core/services/calendar/calendar.service';
import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import {
  CalendarEvent,
  CalendarEventTimesChangedEvent,
} from 'angular-calendar';
import { addHours, startOfDay } from 'date-fns';
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

  users = [];

  events: CalendarEvent[] = [];
  constructor(private calS: CalendarService,private cdref: ChangeDetectorRef){

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
    this.calS.selectedDate.subscribe(d =>{
      this.loadEvent(d);
    });
    this.loadEvent(this.viewDate);
  }
  loadEvent(date){
    this.calS.getCabinetAppointment(date).subscribe((e: any) =>{
      console.log(e);
      const eventList = e.appointments.map((apt, i) => (
        {
          title: apt.personName,
          color: colors.yellow,
          // color:  {
          //   secondary: this.calS.colorCode(apt.colorCode),
          //   primary: this.calS.colorCode(apt.colorCode),
          // },
          // start: new Date(apt.startTime ),
          start: addHours(startOfDay(new Date()), 5),
          end: addHours(startOfDay(new Date()), 8),
          // end: new Date(apt.endTime ),
          meta: {
            user: {
              id: i,
              name: apt.personName,
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

      const distinctUser = [];
      const filterdUser =[];
      e.appointments.forEach((apt,i) =>
         {
          if(!distinctUser.includes(apt.uid)){
            distinctUser.push(apt.uid);
            filterdUser.push({
              id: i,
              name: this.acronym(apt.personName),
              title: this.acronym(apt.personName),
              color: colors.yellow,
            });
          }
        }
      );

      this.events = eventList;
      this.users = filterdUser;
      //this.cdref.detectChanges();
      console.log(this.users);
      console.log(this.events);
    });
  }
  acronym(text) {
    console.log(text);
    return text
      .split(/\s/)
      .reduce((accumulator, word) => accumulator + word.charAt(0), '');
  }

}
