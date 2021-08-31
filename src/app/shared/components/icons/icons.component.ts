import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-icons',
  templateUrl: './icons.component.html',
  styleUrls: ['./icons.component.scss'],
})
export class IconsComponent implements OnInit {

  @Input() color: string;
  @Input() class: string;
  @Input() name: string;
  @Input() slot: string;
  @Input() tooltip: string;
  @Input() tooltipClass: string;
  constructor() { }

  ngOnInit() { }
  isClicked() {
  }

}
