import { Component, type OnInit } from '@angular/core'
import { type AuthService } from 'src/app/services/auth/FirebaseServices'

@Component({
  selector: 'app-birthday',
  templateUrl: './birthday.page.html',
  styleUrls: ['./birthday.page.scss']
})
export class BirthdayPage implements OnInit {
  estudiantes: any[] = []
  today = new Date()

  constructor (
    private readonly auth: AuthService

  ) {}

  ngOnInit () {
    this.getEstudiantes()
  }

  async getEstudiantes (): Promise<void> {
    try {
      const estudiantes = await this.auth.getAllEstudiantes().toPromise()

      if (estudiantes) {
        // Obtén la fecha actual
        const today = new Date()

        // Filtra y ordena a los estudiantes por cercanía a la fecha actual
        this.estudiantes = estudiantes
          .filter((estudiante) => {
            const estudianteBirthday = new Date(estudiante.birthday)
            // Filtra los estudiantes que tienen cumpleaños en el futuro
            return estudianteBirthday >= today
          })
          .sort((a, b) => {
            const aBirthday = new Date(a.birthday)
            const bBirthday = new Date(b.birthday)
            // Calcula la diferencia en milisegundos entre las fechas
            const differenceA = aBirthday.getTime() - today.getTime()
            const differenceB = bBirthday.getTime() - today.getTime()
            // Ordena los estudiantes por cercanía a la fecha actual
            return differenceA - differenceB
          });
            } else {
        // Si estudiantes es undefined, realiza alguna acción de manejo de errores
      }
    } catch (error) {
      console.error('Error al obtener estudiantes:', error)
    }
  }

  getEstudiantesManana (): any[] {
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    return this.estudiantes.filter((estudiante) => {
      const estudianteBirthday = new Date(estudiante.birthday)
      return (
        estudianteBirthday.getDate() === tomorrow.getDate() &&
        estudianteBirthday.getMonth() === tomorrow.getMonth()
      );
    })
  }

  getEstudiantesEstaSemana (): any[] {
    const endOfWeek = new Date()
    endOfWeek.setDate(endOfWeek.getDate() + (6 - endOfWeek.getDay()))
    return this.estudiantes.filter((estudiante) => {
      const estudianteBirthday = new Date(estudiante.birthday)
      return estudianteBirthday <= endOfWeek
    });
    }
}
