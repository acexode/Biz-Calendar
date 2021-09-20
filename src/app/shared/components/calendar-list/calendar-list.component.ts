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
      const dates = e?.appointments.map(d => new Date(d.startTime).toLocaleDateString());
      const uniqDates = [...new Set(dates)];
      const appt = uniqDates.map(unq =>{
        const ev = e?.appointments.filter(s => new Date(s.startTime).toLocaleDateString() === unq );
        const formattedEvent = ev.map(form =>{
          const icons = new Set(form.icons.map(this.calS.iconCode));
          const start = new Date(form.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          const end = new Date(form.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          return {
            id: form.uid,
            icons: [...icons],
            title: form.personName,
            time: start + ' - '+ end ,
            desc: form.subject,
            location: form.locationUID,
            class: this.calS.colorCode(form.colorCode),
          };
        });
      return {
        day: format(new Date(unq), 'EEEE d', {locale: ro}),
        total: formattedEvent.length + ' programari',
        current: true,
        events: formattedEvent
      };
      });
      this.eventList = appt;
      console.log(appt);
    });
  }


}
