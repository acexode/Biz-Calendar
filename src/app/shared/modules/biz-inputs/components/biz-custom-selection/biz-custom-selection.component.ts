import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AparaturaAsociataModel } from 'src/app/core/models/aparatura-asociata.model';
import { BizCustomSelectionConfig } from 'src/app/shared/models/components/biz-custom-selection-config';
import { DemoCheckList } from 'src/app/style-guide/components/selection/selection.component';


@Component({
  selector: 'app-biz-custom-selection',
  templateUrl: './biz-custom-selection.component.html',
  styleUrls: ['./biz-custom-selection.component.scss'],
})
export class BizCustomSelectionComponent implements OnInit {
  @Input() data!: AparaturaAsociataModel[];
  @Input() config: BizCustomSelectionConfig;
  @Input() selectedValue: any[] = [];
  @Output() modalOpenEvent = new EventEmitter<any>();
  @Output() removeItemEvent: EventEmitter<boolean> = new EventEmitter<boolean>(false);
  constructor() { }

  ngOnInit() {
  }
  removeChips(event: any, uid: string): void {
    // IOS is a mess. Stop propagating the event to the input under the buttons.
    this.stopModalPropagation(event);
    this.unCheckItem(uid);
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
  get filtercustomComponentData():  AparaturaAsociataModel[]{
    return this.data.filter((v: AparaturaAsociataModel) => this.selectedValue.includes(v.uid));
  }
  unCheckItem(uid: string): void {
    if (typeof uid !== null && uid !== '') {
      const indexOfData = this.selectedValue.findIndex(
        (v: string) => v === uid);
      console.log('index: ', indexOfData);
     if (indexOfData > -1) {
       this.selectedValue.splice(indexOfData, 1);
       console.log(this.selectedValue);
      }
    }
  }

}
