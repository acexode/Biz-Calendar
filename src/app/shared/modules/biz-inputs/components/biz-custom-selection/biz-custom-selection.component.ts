import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';


@Component({
  selector: 'app-biz-custom-selection',
  templateUrl: './biz-custom-selection.component.html',
  styleUrls: ['./biz-custom-selection.component.scss'],
})
export class BizCustomSelectionComponent implements OnInit {
  @Input() data!: any;
  @Output() modalOpenEvent = new EventEmitter<any>();
  @Output() removeItemEvent: EventEmitter<string | null> = new EventEmitter<string | null>(null);
  constructor() { }

  ngOnInit() { }
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

}
