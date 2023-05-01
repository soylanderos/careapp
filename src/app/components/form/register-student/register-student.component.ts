import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/FirebaseServices';
import { FeedbackService } from 'src/app/services/feedback/feedback.service';
import { Estudiante } from 'src/app/services/auth/FirebaseServices';



@Component({
  selector: 'app-register-student',
  templateUrl: './register-student.component.html',
  styleUrls: ['./register-student.component.scss'],
})
export class RegisterStudentComponent  implements OnInit {

  fields: FormGroup
  campos: any=[]
  miInput = new FormControl('');
  estudiante: Estudiante

  constructor(
    private afAuth: AuthService,
    private fb: FormBuilder,
    private FbService: FeedbackService
  ) {
    this.estudiante = {
      uid: '', email: '', name: '', firstname: '', lastname: '', birthday: '', tutor: '',
    }
    this.fields = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      name: ['', [Validators.required]],
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      birthday: ['',[Validators.required]],
      tutor: ['', [Validators.required]]

    })
  }
  ngOnInit() {
    this.getFields()
    this.miInput.reset();
  }
 getFields(){
    this.afAuth.getAllForms().subscribe((data)=>{
      this.campos = data;
      console.log(this.campos)

    })
  }

  print(){
    console.log(this.fields.value)
  }

  register(){
    const email = this.fields.value.email;
    const password = this.fields.value.password;
    const name = this.fields.value.name;
    const firstname = this.fields.value.firstname;
    const lastname = this.fields.value.lastname;
    const birthday = this.fields.value.birthday;
    const tutor = this.fields.value.tutor;

    this.afAuth.register(email, password, name, firstname, lastname, birthday, tutor)

    if(this.fields.invalid){
      this.FbService.showToast('Por favor, rellena los campos obligatorios');
      return;
    }
    if(this.fields.valid){
      console.log('niceeefields')
    }
  }
}
