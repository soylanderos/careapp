import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';


import { AdminConfigPageRoutingModule } from './admin-config-routing.module';

import { AdminConfigPage } from './admin-config.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminConfigPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [
    AdminConfigPage
  ]
})
export class AdminConfigPageModule {}
