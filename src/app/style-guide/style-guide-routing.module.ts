import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SelectionComponent } from './components/selection/selection.component';

import { StyleGuidePage } from './style-guide.page';

const routes: Routes = [
  {
    path: '',
    component: StyleGuidePage
  },
  {
    path: 's',
    component: SelectionComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StyleGuidePageRoutingModule { }
