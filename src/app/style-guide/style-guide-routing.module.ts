import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StyleGuidePage } from './style-guide.page';

const routes: Routes = [
  {
    path: '',
    component: StyleGuidePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StyleGuidePageRoutingModule {}
