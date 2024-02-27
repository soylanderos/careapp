import { Personal } from '../../services/auth/FirebaseServices';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/FirebaseServices';
import { FeedbackService } from 'src/app/services/feedback/feedback.service';
import { AlertController } from '@ionic/angular';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-team',
  templateUrl: './team.page.html',
  styleUrls: ['./team.page.scss'],
})
export class TeamPage implements OnInit {

  segmentValue = "viewAll";
  team = 'maestra'
  miInput = new FormControl('');
  registerFormPersonal: FormGroup;
  personal: Personal;
  alertButtons = ['OK'];
  campos: any=[];
  maestras: any=[]
  recepcionistas: any=[]


  constructor(
    private fb: FormBuilder,
    private afAuth: AuthService,
    private FbService: FeedbackService,
    private alertController: AlertController
  ) {
    this.personal = { id: '', email: '', password: '', name: '', firstname: '', lastname: '', birthday: '', functionP: '', }
    this.registerFormPersonal = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      firstname: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      lastname: ['', [Validators.minLength(3), Validators.maxLength(20)]],
      birthday: ['', [Validators.minLength(3), Validators.maxLength(20)]],
      functionP: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
    })
  }

  ngOnInit() {
    this.getFields();
    this.miInput.reset();
    this.presentAlert();
    this.getPersonalMaestras();
    this.getPersonalRecepcion();
  }
  //Functions
  async presentAlert() {
    if (this.shouldShowAlert()){
    const alert = await this.alertController.create({
      header: 'Mensaje Importante',
      subHeader: 'Recuerda',
      message: 'Después de crear un nuevo usuario deberás Iniciar Sesión en tu cuenta de Administrador nuevamente',
      buttons: [
        {
          text: 'No volver a mostrar',
          handler: () => {
            localStorage.setItem('hideAlert', 'true');
          }
        },
        ' Ok'
      ]
    });

      await alert.present();
   }
  }

  shouldShowAlert() {
    return !localStorage.getItem('hideAlert');
  }

  register(){
    const email = this.registerFormPersonal.value.email
    const password = this.registerFormPersonal.value.password
    const name = this.registerFormPersonal.value.name
    const firstname = this.registerFormPersonal.value.firstname
    const lastname = this.registerFormPersonal.value.lastname
    const birthday = this.registerFormPersonal.value.birthday
    const functionP = this.registerFormPersonal.value.functionP
    this.afAuth.registerPersonal(email, password, name, firstname, lastname, birthday, functionP)

    if(this.registerFormPersonal.invalid) {
      this.FbService.showToast('Por favor, rellena los campos obligatorios');
      return;
    }
    if(this.registerFormPersonal.valid) {
      this.FbService.showToast('Usuario creado correctamente');
      this.registerFormPersonal.reset();
    }
  }

  print() {
   console.log(this.registerFormPersonal.value)
  }

  getFields() {
    this.afAuth.getAllRegisterPersonal().subscribe((data) => {
      this.campos = data;
    })
  }

  getPersonalMaestras() {
    this.afAuth.getAllPersonal().subscribe((data) => {
      this.maestras = data.filter((persona) => persona.functionP === 'Maestra');
    })
  }

  getPersonalRecepcion() {
    this.afAuth.getAllPersonal().subscribe((data) => {
      this.recepcionistas = data.filter((persona) => persona.functionP === 'Recepcion');
    })
  }
}
