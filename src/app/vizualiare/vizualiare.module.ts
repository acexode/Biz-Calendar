import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VizualiarePageRoutingModule } from './vizualiare-routing.module';

import { VizualiarePage } from './vizualiare.page';
import { ProgramareComponent } from './programare/programare.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VizualiarePageRoutingModule
  ],
  declarations: [VizualiarePage, ProgramareComponent]
})
export class VizualiarePageModule {}
