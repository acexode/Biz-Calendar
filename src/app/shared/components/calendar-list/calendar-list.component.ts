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
    this.getEventLists();
  }


  getEventLists(){
    this.calS.appointments$.subscribe(e =>{
      const tempBg = ['green-bg', 'blue-bg', 'yellow-bg', 'orange-bg', 'green-pattern', 'gray-bg', 'blue-pattern'];
      const dates = e?.appointments.map(d => new Date(d.startTime).toLocaleDateString());
      const uniqDates = [...new Set(dates)];
      const appt = uniqDates.map(unq =>{
        const ev = e?.appointments.filter(s => new Date(s.startTime).toLocaleDateString() === unq );
        const formattedEvent = ev.map(form =>({
          id: form.uid,
          icons: ['cnas'],
          title: form.personName,
          time: '09:00 - 09:30',
          desc: form.subject,
          location: 'Buc. Aviatori',
          class: tempBg[Math.floor(Math.random()*tempBg.length)],
        }));
      return {
        day: format(new Date(unq), 'EEEE d', {locale: ro}),
        current: true,
        events: formattedEvent
      };
      });
      this.eventList = appt;

    });
  }
  colorCode(code){
    let cssClass;
    switch (code) {
      case '1CS':
        cssClass = 'green-bg';
        break;
      case '1CY':
        cssClass = 'green-bg';
        break;
      case '1CN':
         cssClass = 'green-pattern';
        break;
      case '1N':
        cssClass = 'yellow-bg';
        break;
      case 4:
        cssClass = 'Thursday';
        break;
      case 5:
        cssClass = 'Friday';
        break;
      case 6:
        cssClass = 'Saturday';
    }
  }

}
