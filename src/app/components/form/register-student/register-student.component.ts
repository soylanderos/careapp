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
       id: '', email: '', name: '', firstname: '', lastname: '', birthday: '', tutor: '', phone: '',
    }
    this.fields = this.fb.group({
      id: ['', [ Validators.minLength(10)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      name: ['', [Validators.required]],
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      birthday: ['',[Validators.required]],
      tutor: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.minLength(10)]],

    })
  }
  ngOnInit() {
    this.getFields()
    this.miInput.reset();
  }
 getFields(){
    this.afAuth.getAllForms().subscribe((data)=>{
      this.campos = data;
    })
  }

  print(){
    console.log(this.fields.value)
  }

  register(){
    const id = this.fields.value.id;
    const email = this.fields.value.email;
    const password = this.fields.value.password;
    const name = this.fields.value.name;
    const firstname = this.fields.value.firstname;
    const lastname = this.fields.value.lastname;
    const birthday = this.fields.value.birthday;
    const tutor = this.fields.value.tutor;
    const phone = this.fields.value.phone;

    this.afAuth.register(email, password, id, name, firstname, lastname, birthday, tutor, phone)

    if(this.fields.invalid){
      this.FbService.showToast('Por favor, rellena los campos obligatorios');
      return;
    }
    if(this.fields.valid){
      this.FbService.showToast('Estudiante registrado');
      this.fields.reset();
    }
  }
}
