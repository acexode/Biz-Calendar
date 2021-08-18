import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
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
  // {
  //     id: 5,
  //     name: 'B.C.D.',
  //     title: 'Dna.',
  //     color: colors.yellow
  // },
  // {
  //     id: 6,
  //     name: 'B.C.D.',
  //     title: 'Dna.',
  //     color: colors.yellow
  // },
  // {
  //     id: 7,
  //     name: 'B.C.D.',
  //     title: 'Dna.',
  //     color: colors.yellow
  // },
];
@Component({
  selector: 'app-comparativ',
  templateUrl: './comparativ.component.html',
  styleUrls: ['./comparativ.component.scss'],
})
export class ComparativComponent implements OnInit {

  viewDate = new Date();

  users = users;

  events: CalendarEvent[] = [
    {
      title: 'An event',
      color: users[0].color,
      start: addHours(startOfDay(new Date()), 5),
      meta: {
        user: users[0],
      },
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      draggable: true,
    },
    {
      title: 'Another event',
      color: users[1].color,
      start: addHours(startOfDay(new Date()), 2),
      meta: {
        user: users[1],
      },
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      draggable: true,
    },
    {
      title: 'A 3rd event',
      color: users[0].color,
      start: addHours(startOfDay(new Date()), 7),
      meta: {
        user: users[0],
      },
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      draggable: true,
    },
    {
      title: 'An all day event',
      color: users[0].color,
      start: new Date(),
      meta: {
        user: users[0],
      },
      draggable: true,
      allDay: true,
    },
    {
      title: 'Another all day event',
      color: users[1].color,
      start: new Date(),
      meta: {
        user: users[1],
      },
      draggable: true,
      allDay: true,
    },
    {
      title: 'A 3rd all day event',
      color: users[0].color,
      start: new Date(),
      meta: {
        user: users[0],
      },
      draggable: true,
      allDay: true,
    },
  ];

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

  ngOnInit() {}

}
