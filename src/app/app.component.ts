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

  formatUserName(email: string | null): string {
    // Si email es null o undefined, devuelve una cadena vacía o un valor por defecto
    if (!email) {
        return '';
    }
    // Extrae la parte antes de @
    const namePart = email.split('@')[0];
    // Convierte la primera letra a mayúscula y el resto a minúscula
    const formattedName = namePart.charAt(0).toUpperCase() + namePart.slice(1).toLowerCase();
    return formattedName;
}
}
