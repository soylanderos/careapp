import { Component, OnInit, Input, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth/FirebaseServices';
import { Firestore } from '@angular/fire/firestore';
import { collection } from '@angular/fire/firestore';
import { differenceInYears } from 'date-fns';


@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
})
export class UserDetailComponent  implements OnInit {

  user: any;
  @Input() usuario: any;
  @Output() users: any
  maestras: any[] = []; // Asignar un valor por defecto
  estudianteCollection = collection(this.firestore, 'estudiantes');
  miss = []
  edad = 0


  constructor(
    private modalController: ModalController,
    private authService: AuthService,
    private firestore: Firestore,
  ) {

    this.getPersonalMaestras();
   }

  ngOnInit() {
    this.calcularEdad()
  }

  cerrarModal() {
    this.modalController.dismiss();
  }

  getPersonalMaestras() {
    this.authService.getAllPersonal().subscribe((data) => {
      //find functionP is Maestra
      this.maestras = data.filter(function (p) {
        return p.functionP == 'Maestra';
      })
    });
  }

  async UpdateEstudiante(): Promise<void> {
    // Crea el nuevo campo
    const nuevoCampo = { maestra: this.miss };

    // Combina el objeto `this.usuario` con `nuevoCampo`
    const estudianteActualizado = { ...this.usuario, ...nuevoCampo };

    try {
      // Espera a que la operación de actualización finalice
      await this.authService.updateEstudiante(estudianteActualizado);

      console.log('Estudiante actualizado correctamente');

      // Cerrar modal si es necesario
      this.cerrarModal();
    } catch (error) {
      console.error('Error actualizando estudiante:', error);
    }
  }

  calcularEdad() {
    const fechaNacimiento = this.usuario.birthday;
    const fechaNacimientoObj = new Date(fechaNacimiento);
    const fechaActual = new Date();
    const diferenciaMilisegundos = fechaActual.getTime() - fechaNacimientoObj.getTime();
    const edad = Math.floor(diferenciaMilisegundos / 1000 / 60 / 60 / 24 / 365);
    this.edad = edad;
  }

  DeleteEstudiante(){
    this.authService.deleteEstudiante(this.usuario.id);
    this.cerrarModal();
  }
}
