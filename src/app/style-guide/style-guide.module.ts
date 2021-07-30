import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StyleGuidePageRoutingModule } from './style-guide-routing.module';

import { StyleGuidePage } from './style-guide.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StyleGuidePageRoutingModule
  ],
  declarations: [StyleGuidePage]
})
export class StyleGuidePageModule {}
