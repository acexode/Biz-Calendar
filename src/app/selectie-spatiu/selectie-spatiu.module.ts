import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelectieSpatiuPageRoutingModule } from './selectie-spatiu-routing.module';

import { SelectieSpatiuPage } from './selectie-spatiu.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelectieSpatiuPageRoutingModule
  ],
  declarations: [SelectieSpatiuPage]
})
export class SelectieSpatiuPageModule {}
