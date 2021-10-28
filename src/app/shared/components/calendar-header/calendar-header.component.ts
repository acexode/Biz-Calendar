import { distinctUntilChanged } from 'rxjs/operators';
/* eslint-disable @typescript-eslint/naming-convention */
import { CalendarService } from './../../../core/services/calendar/calendar.service';
import { locationOptions, programOptions,
  selectConfig, selectConfigB, utilizatorList, cabinetList, aparatList } from './../../data/select-data';
import { AlertController, MenuController, ModalController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, Input, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { EVENTLIST } from 'src/app/home/event';
import { CalendarPages } from '../calendar/calendarPages';
import { IonSelectConfig } from '../../models/components/ion-select-config';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { CalendarView } from 'angular-calendar';
import { format, startOfDay } from 'date-fns';
import { ro } from 'date-fns/locale';
import { CalModalComponent } from '../modal/cal-modal/cal-modal.component';
import { CalendarComponent } from 'ionic2-calendar';
import { trigger, style, animate, transition, state } from '@angular/animations';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-calendar-header',
  templateUrl: './calendar-header.component.html',
  styleUrls: ['./calendar-header.component.scss'],
  animations: [
    trigger('openClose', [
      state('open', style({height: '*', opacity: 1, visibility: 'visible'})),
      state('closed', style({height: '0px', opacity: 0, visibility: 'hidden'})),
      transition('open <=> closed',
        animate('500ms cubic-bezier(.37,1.04,.68,.98)')),
    ])
  ]
})
export class CalendarHeaderComponent implements OnInit, OnDestroy {
  @Input() isModal = false;
  isTablet = false;
  isComparativ= false;
  showPicker = false;
  view: CalendarView = CalendarView.Month;
  viewDate: Date = new Date();
  month = format(new Date(), 'MMMM', { locale: ro });
  currDay = format(new Date(), 'E', { locale: ro });
  currDate = format(new Date(), 'd', { locale: ro });
  // eslint-disable-next-line @typescript-eslint/naming-convention
  CalendarView = CalendarView;
  locationCal: FormControl = new FormControl('');
  activatedPath  = '';
  config: IonSelectConfig =selectConfig;
  locationConfig: IonSelectConfig = {
    ...selectConfig,
    multiple: false
  };
  configB: IonSelectConfig = selectConfigB;
  locationOptions = [];
  programOptions = programOptions;
  programList = utilizatorList;
  totalAppt = 0;
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

    selectedDate$: Subscription ;

    // @ViewChild(CalendarComponent) myCal: CalendarComponent
    public calendarPages = CalendarPages;
  constructor(private router: Router, private activatedRoute: ActivatedRoute,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController,private calS: CalendarService,
    private fb: FormBuilder, private menu: MenuController,) { }


  ngOnInit() {
    const path = this.activatedRoute.snapshot.paramMap.get('id');
    console.log(path);
    if(path === 'utilizatori'){
      this.locationForm.get('program').patchValue(this.programOptions[0].id);
    }else if(path === 'cabinet'){
      this.locationForm.get('program').patchValue(this.programOptions[1].id);
    }else if(path === 'aparate'){
      this.locationForm.get('program').patchValue(this.programOptions[2].id);
    }
    this.calS.getLocations().subscribe((e: any) =>{
      const mappedLocations = e.locations.map(loc =>({
        id: loc.uid,
        label: loc.locationName
      }));
      this.locationOptions = mappedLocations;
      this.locationForm.get('location').patchValue(this.locationOptions[0].id);
    });
    this.calS.selectedDate.subscribe(e =>{
      if(e){
        this.currDay = format(new Date(e), 'E', { locale: ro });
        this.currDate = format(new Date(e), 'd', { locale: ro });

      }
      // this.viewDate = new Date(e);
    });
    this.calS.appointments$.subscribe(e => {
      console.log('TOTAL', e);
      this.totalAppt = e?.appointments.length;
    });
    this.calS.eventCounts.pipe(distinctUntilChanged()).subscribe(count =>{
      console.log('COUNT', count);
      this.totalAppt = count;
    });
    this.calS.selectedMonth.subscribe(e =>{
      this.month = e.split(' ')[0];
    });
    this.selectedDate$ = this.calS.selectedDate.subscribe(e =>{
      this.showPicker = false;
    });
    this.locationForm.get('program').valueChanges.subscribe(val =>{
      // console.log(val);
      if(val === '1'){
        this.calS.filterProgram.next('physicianName');
        this.programList = utilizatorList;
      }else if(val === '2'){
        this.calS.filterProgram.next('cabinetName');
        this.programList = cabinetList;
      }
      else if(val === '3'){
        this.calS.filterProgram.next('equipmentName');
        this.programList = aparatList;
      }
    });
    this.locationForm.get('location').valueChanges.pipe(distinctUntilChanged()).subscribe(val =>{
      const loc = this.locationOptions.filter(l => l.id === val)[0];
      // console.log(loc, val);
      this.calS.filterLocation.next(loc?.label);
      const obj = {
        LocationUID: val
      };
      this.calS.cabinetQuery$.next(obj);
    });
    this.isTablet = window.innerWidth >= 768 ? true : false;
    window.addEventListener('resize', ()=>{
      this.isTablet = window.innerWidth >= 768 ? true : false;
    });
    this.page = this.activatedRoute.snapshot.paramMap.get('id');
    if(this.page === 'aparate' || this.page === 'cabinet' || this.page === 'utilizatori'){
      this.isComparativ = true;
    }else{
      this.isComparativ = false;
    }
    if(this.page === 'list'){
      this.calendarList = EVENTLIST;
    }
  }
  toggleMenu(){
    this.menu.toggle();
  }
  navigate(path: string){
    // console.log(path.split('/')[2]);
    this.router.navigate([path]);
    this.calS.selectedPath.next(path.split('/')[2]);
  }
  segmentChanged(id){
  }
  async openCalModal() {
    this.showPicker = !this.showPicker;
    this.calS.showPicker.next(this.showPicker);
    // const modal = await this.modalCtrl.create({
    //   component: CalModalComponent,
    //   cssClass: 'cal-modal',
    //   componentProps: {
    //     isTablet: this.isTablet
    //   },
    //   backdropDismiss: false
    // });
    // await modal.present();
    // modal.onDidDismiss().then((result) => {
    //   if (result.data && result.data.event) {
    //     const event = result.data.event;
    //     if (event.allDay) {
    //       const start = event.startTime;
    //       event.startTime = new Date(
    //         Date.UTC(
    //           start.getUTCFullYear(),
    //           start.getUTCMonth(),
    //           start.getUTCDate()
    //         )
    //       );
    //       event.endTime = new Date(
    //         Date.UTC(
    //           start.getUTCFullYear(),
    //           start.getUTCMonth(),
    //           start.getUTCDate() + 1
    //         )
    //       );
    //     }
    //     this.eventSource.push(result.data.event);
    //     // this.myCal.loadEvents();
    //   }
    // });
  }
  ngOnDestroy(): void {
    this.selectedDate$.unsubscribe();
  }

}


