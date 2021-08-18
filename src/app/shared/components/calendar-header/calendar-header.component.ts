import { locationOptions, programOptions,
  selectConfig, selectConfigB, utilizatorList, cabinetList, aparatList } from './../../data/select-data';
import { MenuController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { EVENTLIST } from 'src/app/home/event';
import { CalendarPages } from '../calendar/calendarPages';
import { IonSelectConfig } from '../../models/components/ion-select-config';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-calendar-header',
  templateUrl: './calendar-header.component.html',
  styleUrls: ['./calendar-header.component.scss'],
})
export class CalendarHeaderComponent implements OnInit {
  isTablet = false;
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
    public calendarPages = CalendarPages;
  constructor(private router: Router, private activatedRoute: ActivatedRoute,
    private fb: FormBuilder, private menu: MenuController) { }

  ngOnInit() {
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

}
