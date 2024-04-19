import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/FirebaseServices';
import { filter } from 'rxjs/operators';
import { AppointmentService } from 'src/app/services/citas/citas.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  user$ = this.auth.authState$.pipe(
    filter(state => state ? true : false)
  )
  appointments: any[] = [];
  citasHoy: any[] = [];
  citasManana: any[] = [];
  citasSemana: any[] = [];


  constructor(
    private auth: AuthService,
    private citasService: AppointmentService,
    private router: Router
  ) {
     //print user logged
     this.user$.subscribe(user => {
      console.log(user?.email);
      if(!user){
        console.log('no log')
      }
    })
   }

  ngOnInit() {
    this.getCitas();
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

  getCitas() {
    this.citasService.getAppointments().subscribe(data => {
        if (Array.isArray(data)) {
            // Inicializa los arrays vacíos
            this.citasHoy = [];
            this.citasManana = [];
            this.citasSemana = [];

            // Obtén la fecha y la hora actual
            const hoy = new Date();
            const manana = new Date();
            manana.setDate(hoy.getDate() + 1);

            const proximaSemana = new Date();
            proximaSemana.setDate(hoy.getDate() + 7);

            // Filtra las citas según las fechas de hoy, mañana y la próxima semana
            data.forEach((cita: any) => {
                // Verifica que cita.startDate tiene un valor válido antes de dividir
                if (cita.startDate) {
                    // Convierte startDate de formato AAAA/MM/DD HH:MM:SS a un objeto Date
                    const fechaCita = new Date(cita.startDate);

                    // Citas de hoy
                    if (
                        fechaCita.toDateString() === hoy.toDateString()
                    ) {
                        this.citasHoy.push(cita);
                    }
                    // Citas de mañana
                    else if (
                        fechaCita.toDateString() === manana.toDateString()
                    ) {
                        this.citasManana.push(cita);
                    }
                    // Citas de la próxima semana
                    else if (
                        fechaCita > manana &&
                        fechaCita <= proximaSemana
                    ) {
                        this.citasSemana.push(cita);
                    }
                } else {
                    console.warn('La cita tiene un startDate inválido o ausente:', cita);
                }
            });

            console.log('Citas de hoy:', this.citasHoy);
            console.log('Citas de mañana:', this.citasManana);
            console.log('Citas de la próxima semana:', this.citasSemana);
        } else {
            console.error('Los datos no son un array:', data);
        }
    });
  }

navigateTo(url: string): void {
    // Redirige al usuario a la URL específica utilizando Router
    this.router.navigate([url]);
  }




}
