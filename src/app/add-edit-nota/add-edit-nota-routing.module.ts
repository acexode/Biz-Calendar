import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddEditNotaPage } from './add-edit-nota.page';

const routes: Routes = [
  {
    path: '',
    component: AddEditNotaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddEditNotaPageRoutingModule {}
