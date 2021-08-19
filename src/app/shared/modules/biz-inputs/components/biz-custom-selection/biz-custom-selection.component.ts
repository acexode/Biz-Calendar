import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BizCustomSelectionConfig } from 'src/app/shared/models/components/biz-custom-selection-config';


@Component({
  selector: 'app-biz-custom-selection',
  templateUrl: './biz-custom-selection.component.html',
  styleUrls: ['./biz-custom-selection.component.scss'],
})
export class BizCustomSelectionComponent implements OnInit {
  @Input() data!: any;
  @Input() config: BizCustomSelectionConfig;
  @Output() modalOpenEvent = new EventEmitter<any>();
  @Output() removeItemEvent: EventEmitter<string | null> = new EventEmitter<string | null>(null);
  constructor() { }

  ngOnInit() {
    console.log(this.data);
  }
  removeChips(event: any, item: string): void {
    // IOS is a mess. Stop propagating the event to the input under the buttons.
    this.stopModalPropagation(event);
    this.removeItemEvent.emit(item);
  }
  openModal() {
    this.modalOpenEvent.emit(true);
  }
  stopModalPropagation(event: Event): void {
    event.stopPropagation();
  }
  get useIcon(): boolean {
    return this.config.hasOwnProperty('useIcon') ? true : false;
  } // caret-down

}
