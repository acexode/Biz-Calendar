import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DataStatisticePage } from './data-statistice.page';

const routes: Routes = [
  {
    path: '',
    component: DataStatisticePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DataStatisticePageRoutingModule {}
