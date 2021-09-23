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
import { NewPacientModalComponent } from './new-pacient-modal/new-pacient-modal.component';
import { GrupNouModalComponent } from './grup-nou-modal/grup-nou-modal.component';
import { PacientViewModalComponent } from './pacient-view-modal/pacient-view-modal.component';
import { BizSearchableRadioModalComponent } from './biz-searchable-radio-modal/biz-searchable-radio-modal.component';
import { CabinetComponent } from './cabinet/cabinet.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgCalendarModule } from 'ionic2-calendar';
import { CoreModule } from 'src/app/core/core.module';



@NgModule({
  declarations: [
    SelectieServiciiModalComponent,
    InfoPacientModalComponent,
    BizRadioModalComponent,
    MedicModalComponent,
    PacientComponent,
    NewPacientModalComponent,
    GrupNouModalComponent,
    PacientViewModalComponent,
    BizSearchableRadioModalComponent,
    CabinetComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    BizInputsModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    NgCalendarModule,
    CoreModule
  ],
  exports: [
    SelectieServiciiModalComponent,
    InfoPacientModalComponent,
    BizRadioModalComponent,
    MedicModalComponent,
    PacientComponent,
    NewPacientModalComponent,
    GrupNouModalComponent,
    PacientViewModalComponent,
    BizSearchableRadioModalComponent,
    CabinetComponent
  ]
})
export class ModalModule { }
