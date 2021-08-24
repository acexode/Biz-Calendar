import { locationOptions, programOptions,
  selectConfig, selectConfigB, utilizatorList, cabinetList, aparatList } from './../../data/select-data';
import { AlertController, MenuController, ModalController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { EVENTLIST } from 'src/app/home/event';
import { CalendarPages } from '../calendar/calendarPages';
import { IonSelectConfig } from '../../models/components/ion-select-config';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { CalendarView } from 'angular-calendar';
import { format } from 'date-fns';
import { ro } from 'date-fns/locale';
import { CalModalComponent } from '../modal/cal-modal/cal-modal.component';
import { CalendarComponent } from 'ionic2-calendar';


@Component({
  selector: 'app-calendar-header',
  templateUrl: './calendar-header.component.html',
  styleUrls: ['./calendar-header.component.scss'],
})
export class CalendarHeaderComponent implements OnInit {
  @Input() isModal = false;
  isTablet = false;
  view: CalendarView = CalendarView.Month;
  viewDate: Date = new Date();
  month = format(new Date(), 'MMMM', { locale: ro });
  // eslint-disable-next-line @typescript-eslint/naming-convention
  CalendarView = CalendarView;
  locationCal: FormControl = new FormControl('');
  activatedPath  = '';
  config: IonSelectConfig = selectConfig;
  configB: IonSelectConfig = selectConfigB;
  locationOptions = locationOptions;
  programOptions = programOptions;
  programList = utilizatorList;
  public page: string;
  opts = {
    freeMode: true,
    slidesPerView: 3,
    slidesOffsetBefore: 30,
    slidesOffsetAfter: 100
  };
  calendarList: {
    day: string;
    current: boolean;
    events: {
      id: number;
      title: string;
      time: string;
      desc: string;
      location: string;
      class: string;
    }[]; }[];
    locationForm: FormGroup = this.fb.group({
      location: [''],
      program: [''],
    });
    eventSource = [];
    viewTitle: string;

    calendar = {
      mode: 'month',
      currentDate: new Date(),
    };

    selectedDate: Date;

    // @ViewChild(CalendarComponent) myCal: CalendarComponent
    public calendarPages = CalendarPages;
  constructor(private router: Router, private activatedRoute: ActivatedRoute,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController,
    private fb: FormBuilder, private menu: MenuController) { }

  ngOnInit() {
    console.log(this.view);
    this.locationForm.get('program').valueChanges.subscribe(val =>{
      console.log(val);
      if(val === '1'){
        this.programList = utilizatorList;
      }else if(val === '2'){
        this.programList = cabinetList;
      }
      else if(val === '3'){
        this.programList = aparatList;
      }
    });

    this.isTablet = window.innerWidth >= 768 ? true : false;
    window.addEventListener('resize', ()=>{
      this.isTablet = window.innerWidth >= 768 ? true : false;
    });
    this.page = this.activatedRoute.snapshot.paramMap.get('id');
    if(this.page === 'list'){
      this.calendarList = EVENTLIST;
    }
  }
  toggleMenu(){
    this.menu.toggle();
  }
  navigate(path){
    console.log(path);
    this.router.navigate([path]);
  }
  segmentChanged(id){
    console.log(id);
  }
  async openCalModal() {
    const modal = await this.modalCtrl.create({
      component: CalModalComponent,
      cssClass: 'cal-modal',
      componentProps: {
        isTablet: this.isTablet
      },
      backdropDismiss: false
    });
    await modal.present();
    modal.onDidDismiss().then((result) => {
      if (result.data && result.data.event) {
        const event = result.data.event;
        if (event.allDay) {
          const start = event.startTime;
          event.startTime = new Date(
            Date.UTC(
              start.getUTCFullYear(),
              start.getUTCMonth(),
              start.getUTCDate()
            )
          );
          event.endTime = new Date(
            Date.UTC(
              start.getUTCFullYear(),
              start.getUTCMonth(),
              start.getUTCDate() + 1
            )
          );
        }
        this.eventSource.push(result.data.event);
        // this.myCal.loadEvents();
      }
    });
  }

}


