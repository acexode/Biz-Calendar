import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StyleGuidePageRoutingModule } from './style-guide-routing.module';

import { StyleGuidePage } from './style-guide.page';
import { BizInputsModule } from '../shared/modules/biz-inputs/biz-inputs.module';
import { SelectionComponent } from './components/selection/selection.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    StyleGuidePageRoutingModule,
    BizInputsModule
  ],
  declarations: [StyleGuidePage, SelectionComponent]
})
export class StyleGuidePageModule {}
