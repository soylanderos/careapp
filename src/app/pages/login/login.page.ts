import { FeedbackService } from '../../services/feedback/feedback.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/FirebaseServices';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {

  loginForm: FormGroup;
  inputType: string = 'password';
  iconType: string = 'eye-off';

  constructor(
    private fb: FormBuilder,
    private afAuth: AuthService,
    private router: Router,
    private FbService: FeedbackService

  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
   }

  ngOnInit() {
  }

  //Functions
  togglePassword() {
    this.inputType = this.inputType === 'password' ? 'text' : 'password';
    this.iconType = this.iconType === 'eye-off' ? 'eye' : 'eye-off';
  }

  login() {
    if(this.loginForm.invalid){
      this.FbService.showToast('Ingrese su usuario y contraseña');
      return;
    }
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;

    this.afAuth.login(email, password)

  }

}
