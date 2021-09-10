import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectieServiciiModalComponent } from './selectie-servicii-modal/selectie-servicii-modal.component';
import { InfoPacientModalComponent } from './info-pacient-modal/info-pacient-modal.component';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { BizInputsModule } from '../../modules/biz-inputs/biz-inputs.module';
import { BizRadioModalComponent } from './biz-radio-modal/biz-radio-modal.component';
import { MedicModalComponent } from './medic-modal/medic-modal.component';
import { PacientComponent } from './pacient/pacient.component';



@NgModule({
  declarations: [
    SelectieServiciiModalComponent,
    InfoPacientModalComponent,
    BizRadioModalComponent,
    MedicModalComponent,
    PacientComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    BizInputsModule
  ],
  exports: [
    SelectieServiciiModalComponent,
    InfoPacientModalComponent,
    BizRadioModalComponent,
    MedicModalComponent,
    PacientComponent
  ]
})
export class ModalModule { }
