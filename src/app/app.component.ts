import { Component } from '@angular/core';
import { AuthService } from './services/auth/FirebaseServices';
import { Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { FeedbackService } from './services/feedback/feedback.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  isActive = false;

  user$ = this.auth.authState$.pipe(
    filter(state => state ? true : false)
  )

  constructor(
    private auth: AuthService,
    private router: Router,
    private FbService: FeedbackService,
  ) {
    //print user logged
    this.user$.subscribe(user => {
      console.log(user?.email);
      if(!user){
        console.log('no log')
      }
    })
  }

  async logout() {
   await this.auth.logout()
      .then(() => {
        this.FbService.showToast('Sesión Cerrada');
        this.router.navigate(['/login']);
      })
      .catch(error => {
        console.error(error);
      });
  }
}
