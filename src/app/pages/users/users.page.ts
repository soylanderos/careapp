import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/FirebaseServices';


@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {

  users: any= []

  constructor(
    private afAuth: AuthService,
  ) { }


  ngOnInit() {
    this.getEstudiantes()
  }
  getEstudiantes(){
    this.afAuth.getAllEstudiantes().subscribe((data)=>{
      this.users = data;
      console.log(this.users)
      //print fields
       this.users.forEach((element: any) => {
        console.log(element.email)
        console.log(element.name)
        console.log(element.firstname)
        console.log(element.lastname)
        console.log(element.birthday)
        console.log(element.tutor)
       })
    })
  }

}
