import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/FirebaseServices';
import { ModalController } from '@ionic/angular';
import { UserDetailComponent } from '../../components/users/user-detail/user-detail.component'

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {

  users: any= []

  constructor(
    private afAuth: AuthService,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    this.getEstudiantes()
  }

  getEstudiantes(){
    this.afAuth.getAllEstudiantes().subscribe((data)=>{
      this.users = data;
    })
  }

  async verUsuario(user: any) {
    const modal = await this.modalController.create({
      component: UserDetailComponent,
      componentProps: {
        usuario: user
      }
    });
    await modal.present();
  }

}
