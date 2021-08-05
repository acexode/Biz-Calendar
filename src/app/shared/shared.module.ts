import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BizInputsModule } from './modules/biz-inputs/biz-inputs.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BizInputsModule
  ],
  exports: [BizInputsModule]
})
export class SharedModule { }
