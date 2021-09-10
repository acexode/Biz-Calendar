import { ro } from 'date-fns/locale';
import { format } from 'date-fns';
import { CalendarService } from './../../../core/services/calendar/calendar.service';
import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { CalendarEventObject } from 'src/app/core/models/events.interface';

@Component({
  selector: 'app-calendar-list',
  templateUrl: './calendar-list.component.html',
  styleUrls: ['./calendar-list.component.scss'],
})
export class CalendarListComponent implements OnInit {
  @Input() eventList;
  isTablet: boolean;
  constructor(private calS: CalendarService) { }

  ngOnInit() {
    this.isTablet = window.innerWidth >= 768 ? true : false;
    window.addEventListener('resize', ()=>{
      this.isTablet = window.innerWidth >= 768 ? true : false;
    });
    console.log(this.eventList);
    this.calS.appointments$.subscribe(e =>{
      console.log(e);
      const tempBg = ['green-bg', 'blue-bg', 'yellow-bg', 'orange-bg', 'green-pattern', 'gray-bg', 'blue-pattern'];
      const eventObj: CalendarEventObject[] = [];
      const appointments = e?.appointments.map((apt, i, self) => {
        const date = new Date(apt.startTime).toLocaleDateString();
        const ev = self.filter(s => new Date(apt.startTime).toLocaleDateString() === date );
        const formattedEvent = ev.map(form =>({
            id: apt.uid,
            icons: ['cnas'],
            title: apt.personName,
            time: '09:00 - 09:30',
            desc: apt.subject,
            location: 'Buc. Aviatori',
            class: tempBg[Math.floor(Math.random()*tempBg.length)],
          }));
        return {
          day: format(new Date(apt.startTime), 'EEEE d', {locale: ro}),
          current: true,
          events: formattedEvent
        };
      });
      this.eventList = appointments;
      console.log(appointments);
      console.log(new Set(appointments));

    });
  }

}
