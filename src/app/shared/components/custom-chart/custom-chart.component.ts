import { Input } from '@angular/core';
/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { MultiDataSet, Label, Color } from 'ng2-charts';

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
  options = {
    circumference: Math.PI,
    rotation: 1.0 * Math.PI,
  };

  public chartColors: any[] = [
    {
      backgroundColor:['#D5EED1', '#9B57E0']
    }];
  public doughnutChartType: ChartType = 'doughnut';

  public lineChartData = [
     [65, 59, 80, 81 ,45],
  ];
  public lineChartLabels: Label[] = ['29', '32', '32', '33', '45'];
  public lineChartOptions = {
    responsive: true,
    bezierCurve: false,
    lineTension: 0,
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      xAxes : [{
        ticks: {
          autoSkip: true,
          maxTicksLimit: 4
      }
      } ],
      yAxes: [
        {
          id: 'y-axis-0',
          gridLines: {
            lineWidth: 0,
            // color: 'rgba(0,0,0,0)'
        }
        },
      ]
    },

  };
  public lineChartColors: Color[] = [
    {
      borderColor: '#E3F9FF',
      backgroundColor: '',
    },
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartPlugins = [];

  constructor() { }

  ngOnInit(): void {
    // this.options = {
    //   rotation: 1 * Math.PI,
    //   curcumference: 1 * Math.PI
    // };

  }



}
