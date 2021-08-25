import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdaugaProgramareComponent } from './adauga-programare/adauga-programare.component';

import { HomePage } from './home.page';
import { RecurentaComponent } from './recurenta/recurenta.component';

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
    path: 'recurenta',
    component: RecurentaComponent

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule { }
