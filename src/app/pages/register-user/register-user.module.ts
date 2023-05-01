import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { RegisterUserPageRoutingModule } from './register-user-routing.module';

import { RegisterUserPage } from './register-user.page';
import { RegisterStudentComponent } from 'src/app/components/form/register-student/register-student.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegisterUserPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [
    RegisterUserPage,
    RegisterStudentComponent
  ]
})
export class RegisterUserPageModule {}
