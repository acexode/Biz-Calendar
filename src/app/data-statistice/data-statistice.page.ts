import { NumarDeProgramariComponent } from './../shared/components/numar-de-programari/numar-de-programari.component';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { PlatformService } from '../core/services/platform/platform.service';

import { ChartOptions } from 'chart.js';

@Component({
  selector: 'app-data-statistice',
  templateUrl: './data-statistice.page.html',
  styleUrls: ['./data-statistice.page.scss'],
})
export class DataStatisticePage implements OnInit {
  public lineChartData = [
    { data: [65, 59, 80, 81, 56, 55, 40] },
  ];
  public lineChartLabels= ['S9', 'S10', 'S11', 'S12', 'S13'];
  public lineChartOptions = {
    responsive: true,
  };
  public lineChartColors = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,0,0,0.3)',
    },
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartPlugins = [];
  months = [ 'Ianuarie', 'Februarie', 'Martie', 'Aprilie', 'Mai', 'Iunie', 'Iulie', 'August',
  'Septembrie', 'Octombrie', 'Noiembrie', 'Decembrie'];
  list = [
    {
      label:'Număr de programări',
      icon: 'bar-chart',
    },
    {
      label:'Încasări',
      icon: 'paid',
    },
    {
      label:'Servicii C.N.A.S. vs. Cu plată',
      icon: 'privat',
    },
    {
      label:'Programări active vs. anulate',
      icon: 'default',
    },
    {
      label:'Programări vs. consultații efectuate',
      icon: 'consult',
    },
    {
      label:'Pacienți noi vs. recurenți',
      icon: 'users',
    }
  ];

  selected = this.list[0].label;


  adaugaProgramareFormGroup: FormGroup = this.fb.group({
    numar: this.list[0].label
  });
  isWed = false;

  constructor(
    private fb: FormBuilder,
    public modalController: ModalController,
    private pS: PlatformService,
    private router: Router,
  ) { }

  ngOnInit() {

    this.pS.isDesktopWidth$.subscribe(
      v => this.isWed = v
    );

  }


  async presentModalB() {
    const modal = await this.modalController.create({
      component: NumarDeProgramariComponent,
      cssClass: 'biz-modal-class',
      componentProps: {
        list: this.list,
      },
    });
    modal.onDidDismiss()
    .then((data) => {
      console.log(data);
      console.log(data.data.label);
      this.adaugaProgramareFormGroup.get('numar').setValue(data.data.label);
  });
    await modal.present();
  }
  save(): void {

  }


  backAction(){

  }

}
