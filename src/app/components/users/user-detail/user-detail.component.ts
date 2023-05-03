import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
})
export class UserDetailComponent  implements OnInit {

  user: any;
  @Input() usuario: any;

  constructor(
    private modalController: ModalController
  ) { }

  ngOnInit() {
  }

  cerrarModal() {
    this.modalController.dismiss();
  }

}
