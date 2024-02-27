import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/FirebaseServices';
import { FeedbackService } from 'src/app/services/feedback/feedback.service';
import { AlertController } from '@ionic/angular';
import { FormControl } from '@angular/forms';
import { Estudiante } from 'src/app/services/auth/FirebaseServices';


@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.page.html',
  styleUrls: ['./register-user.page.scss'],
})
export class RegisterUserPage implements OnInit {

  alertButtons = ['OK'];

  constructor(
    private fb: FormBuilder,
    private alertController: AlertController
  ) {
   }

  ionViewDidEnter() {
    this.presentAlert();
  }
  ngOnInit() {

  }
  //Functions
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Mensaje Importante',
      subHeader: 'Recuerda',
      message: 'Después de crear un nuevo usuario deberás Iniciar Sesión en tu cuenta de Administrador nuevamente',
      buttons: ['OK']
    });

    await alert.present();
  }


}
