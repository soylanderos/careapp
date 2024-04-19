import { Component, type OnInit } from '@angular/core'
//import { type AuthService } from 'src/app/services/auth/FirebaseServices'

@Component({
  selector: 'app-birthday',
  templateUrl: './birthday.page.html',
  styleUrls: ['./birthday.page.scss']
})
export class BirthdayPage implements OnInit {
  estudiantes: any[] = []
  today = new Date()

  constructor (
  

  ) {}

  ngOnInit () {
  
  }

 
}
