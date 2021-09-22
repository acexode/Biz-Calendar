import { Input } from '@angular/core';
/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';

@Component({
  selector: 'app-custom-chart',
  templateUrl: './custom-chart.component.html',
  styleUrls: ['./custom-chart.component.scss'],
})
export class CustomChartComponent implements OnInit {
  @Input() type;
  public doughnutChartLabels: Label[] = ['', '', ];
  public doughnutChartData: MultiDataSet = [
    [350, 450]  ];
  options = {};
  public doughnutChartType: ChartType = 'doughnut';


  constructor() { }

  ngOnInit(): void {
    this.options = {
      rotation: 1 * Math.PI,
      curcumference: 1 * Math.PI
    };

  }



}
