import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DataStatisticePageRoutingModule } from './data-statistice-routing.module';

import { DataStatisticePage } from './data-statistice.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    DataStatisticePageRoutingModule
  ],
  declarations: [DataStatisticePage]
})
export class DataStatisticePageModule {}
