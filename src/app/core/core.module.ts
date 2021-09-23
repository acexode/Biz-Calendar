import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HourPipe } from './pipes/hour.pipe';



@NgModule({
  declarations: [HourPipe],
  imports: [
    CommonModule
  ],
  exports: [HourPipe]
})
export class CoreModule { }
