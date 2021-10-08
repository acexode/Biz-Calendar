import { ro } from 'date-fns/locale';
import { format } from 'date-fns';
import { CalendarService } from './../../../core/services/calendar/calendar.service';
import { ChangeDetectorRef, Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { CalendarEventObject } from 'src/app/core/models/events.interface';

@Component({
  selector: 'app-calendar-list',
  templateUrl: './calendar-list.component.html',
  styleUrls: ['./calendar-list.component.scss'],
})
export class CalendarListComponent implements OnInit {
  @Input() eventList;
  isTablet: boolean;
  constructor(private calS: CalendarService, private cdRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.isTablet = window.innerWidth >= 768 ? true : false;
    window.addEventListener('resize', ()=>{
      this.isTablet = window.innerWidth >= 768 ? true : false;
    });
    this.getEventLists();
  }


  getEventLists(){
    this.calS.appointments$.subscribe(e =>{
      const dates = e?.appointments.map(d => new Date(d.startTime).toLocaleDateString());
      const week = e?.appointments.map(d => this.weekNumber(d.startTime));
      const uniqDates = [...new Set(week)];
      const appt = uniqDates?.map(unq =>{
        const ev = e?.appointments.filter(s => this.weekNumber(s.startTime) === unq );
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
        day: format(new Date(this.getDateOfWeek(unq)), 'EEEE d', {locale: ro}),
        week: this.getFirstLastDay(this.getDateOfWeek(unq)),
        total: formattedEvent.length + ' programari',
        current: true,
        events: formattedEvent
      };
      });
      this.eventList = appt;
      this.cdRef.detectChanges();
    });
  }
  weekNumber(date){
    const now = new Date(date);
    const onejan = new Date(now.getFullYear(), 0, 1);
    return Math.ceil((((now.getTime() - onejan.getTime()) / 86400000) + onejan.getDay() + 1) / 7);
  }
  getFirstLastDay(d){
    const curr = new Date(d); // get current date
    const first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
    const last = first + 6; // last day is the first day + 6

    const firstday = new Date(curr.setDate(first)).toDateString().split(' ');
    const lastday = new Date(curr.setDate(last)).toDateString().split(' ');
    return firstday[1] + ' ' + firstday[2] + ' - ' + lastday[2];
  }
  getDateOfWeek(w) {
    const year = new Date().getFullYear();
    const d = (1 + (w - 1) * 7); // 1st of January + 7 days for each week
    return new Date(year, 0, d);
  }


}
