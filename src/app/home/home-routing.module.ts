import { AdaugaNotaComponent } from './adauga-nota/adauga-nota.component';
import { AddEditNotaComponent } from './add-edit-nota/add-edit-nota.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdaugaProgramareComponent } from './adauga-programare/adauga-programare.component';

import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage
  },
  {
    path: 'adauga-programare',
    component: AdaugaProgramareComponent
  },
  {
    path: 'editare-nota',
    component: AddEditNotaComponent
  },
  {
    path: 'adauga-nota',
    component: AddEditNotaComponent
  },
  {
    path: 'vizualizare-nota',
    component: AdaugaNotaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule { }
