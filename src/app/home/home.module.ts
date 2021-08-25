import { AdaugaNotaComponent } from './adauga-nota/adauga-nota.component';
import { AddEditNotaComponent } from './add-edit-nota/add-edit-nota.component';
import { NgCalendarModule } from 'ionic2-calendar';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import { AdaugaProgramareComponent } from './adauga-programare/adauga-programare.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    HomePageRoutingModule,
    SharedModule,
    NgCalendarModule,
  ],
  declarations: [HomePage, AdaugaProgramareComponent, AddEditNotaComponent, AdaugaNotaComponent],
})
export class HomePageModule {}
