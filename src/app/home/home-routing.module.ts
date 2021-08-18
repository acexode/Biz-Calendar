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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule { }
