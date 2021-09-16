import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BizCustomSelectionConfig } from 'src/app/shared/models/components/biz-custom-selection-config';
import { DemoCheckList } from 'src/app/style-guide/components/selection/selection.component';


@Component({
  selector: 'app-biz-custom-selection',
  templateUrl: './biz-custom-selection.component.html',
  styleUrls: ['./biz-custom-selection.component.scss'],
})
export class BizCustomSelectionComponent implements OnInit {
  @Input() data!: DemoCheckList[];
  @Input() config: BizCustomSelectionConfig;
  @Output() modalOpenEvent = new EventEmitter<any>();
  @Output() removeItemEvent: EventEmitter<boolean> = new EventEmitter<boolean>(false);
  constructor() { }

  ngOnInit() {}
  removeChips(event: any, item: string): void {
    // IOS is a mess. Stop propagating the event to the input under the buttons.
    this.stopModalPropagation(event);
    this.unCheckItem(item);
    this.removeItemEvent.emit(true);
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
  get filtercustomComponentData() {
    return this.data.filter((v: DemoCheckList) => v.checked === true)
      .map((v: DemoCheckList) => v.value);
  }
  unCheckItem(data: string): void {
    if (typeof data !== null && data !== '') {
      const indexOfData = this.data.findIndex(
        (v: DemoCheckList) => v.value === data);
      if (indexOfData > -1) {
        this.data[indexOfData].checked = false;
      }
    }
  }

}
