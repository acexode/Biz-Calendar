import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddEditNotaPageRoutingModule } from './add-edit-nota-routing.module';

import { AddEditNotaPage } from './add-edit-nota.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    AddEditNotaPageRoutingModule
  ],
  declarations: [AddEditNotaPage]
})
export class AddEditNotaPageModule {}
