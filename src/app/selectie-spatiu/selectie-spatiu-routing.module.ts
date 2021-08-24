import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelectieSpatiuPage } from './selectie-spatiu.page';

const routes: Routes = [
  {
    path: '',
    component: SelectieSpatiuPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelectieSpatiuPageRoutingModule {}
