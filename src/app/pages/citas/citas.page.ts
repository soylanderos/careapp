import { Component, OnInit } from '@angular/core';
import { AppointmentService } from 'src/app/services/citas/citas.service';
import { FeedbackService } from 'src/app/services/feedback/feedback.service';
@Component({
  selector: 'app-citas',
  templateUrl: './citas.page.html',
  styleUrls: ['./citas.page.scss'],
})
export class CitasPage implements OnInit {

  appointments: any[] = [];
  newAppointment: any = {
    name: '',
    email: '',
    phone: '',
    startDate: '',
    endData: ''
  };
  isModalOpen = false;

  constructor(private appointmentService: AppointmentService,
              private feedbackService: FeedbackService
   ) {

  }


  ngOnInit() {
    this.loadAppointments();
  }

    setOpen(isOpen: boolean) {
      this.isModalOpen = isOpen;
    }
    closeModal() {
      console.log('Cerrando modal');
      this.isModalOpen = false; // Cierra el modal
      // Limpia el formulario
      this.newAppointment = {
        name: '',
        email: '',
        phone: '',
        startDate: '',
        endData: ''
      };
    }
    loadAppointments() {
      this.appointmentService.getAppointments().subscribe(data => {
          if (Array.isArray(data)) {
              this.appointments = data;
              console.log('Citas cargadas:', this.appointments);
          } else {
              console.error('Los datos no son un array:', data);
          }
      });
  }

  addAppointment() {
    // Agregar la nueva cita
    this.appointmentService.addAppointment(this.newAppointment).subscribe((response) => {
      // Actualizar la lista de citas después de agregar una nueva cita
      this.loadAppointments();
      // Limpiar el formulario
      this.newAppointment = {
        name: '',
        email: '',
        phone: '',
        startDate: '',
        endData: ''
      };
      //feedback service
      this.feedbackService.showToast('Cita agregada exitosamente');
      // Cierra el modal
      this.isModalOpen = false;
    });


  }


  calculateDuration(startDate: string, endData: string): string {

    const startDateTime = new Date(startDate);
    const endDateTime = new Date(endData);

    // Calcula la diferencia en milisegundos
    const durationInMilliseconds = endDateTime.getTime() - startDateTime.getTime();

    // Convierte la duración de milisegundos a minutos
    const durationInMinutes = durationInMilliseconds / (1000 * 60);


    const hours = Math.floor(durationInMinutes / 60);
    const minutes = Math.floor(durationInMinutes % 60);

    if (hours === 0) {
      return `${minutes} m`;
    }

    return `${hours} h ${minutes} m`;
  }



}
