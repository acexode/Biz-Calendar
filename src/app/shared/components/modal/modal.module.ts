import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectieServiciiModalComponent } from './selectie-servicii-modal/selectie-servicii-modal.component';
import { InfoPacientModalComponent } from './info-pacient-modal/info-pacient-modal.component';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { BizInputsModule } from '../../modules/biz-inputs/biz-inputs.module';



@NgModule({
  declarations: [SelectieServiciiModalComponent, InfoPacientModalComponent],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    BizInputsModule
  ],
  exports: [SelectieServiciiModalComponent, InfoPacientModalComponent]
})
export class ModalModule { }
