import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProgramareComponent } from './programare/programare.component';

import { VizualiarePage } from './vizualiare.page';

const routes: Routes = [
  {
    path: '',
    component: VizualiarePage
  },
  {
    path: 'programare/:id',
    component: ProgramareComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VizualiarePageRoutingModule {}
