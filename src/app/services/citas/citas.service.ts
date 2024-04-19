import { Injectable } from '@angular/core';
import axios, { AxiosInstance } from 'axios';
import { Observable, from, map } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AppointmentService {
    private getApiUrl = 'https://hook.us1.make.com/foa3qal2ef42xnn4bk5znx5fhj36iq7s';
    private postApiUrl = 'https://hook.us1.make.com/boqlsyyc259mtfruf0n8h7gc3ipvjxv3';
    private axiosInstance: AxiosInstance;

    constructor() {
        // Crear una instancia de Axios para la API GET
        this.axiosInstance = axios.create({
            baseURL: this.getApiUrl,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    // Método para obtener las citas de la API
    getAppointments(): Observable<any[]> {
        return from(this.axiosInstance.get('/')).pipe(
            map((response: any) => response.data)
        );
    }

    // Método para agregar una nueva cita a la API
    addAppointment(appointment: any): Observable<any> {
        // Crear una nueva instancia de Axios para la API POST
        const postAxiosInstance = axios.create({
            baseURL: this.postApiUrl,
            headers: {
                'Content-Type': 'application/json'
            }
        });

        return from(postAxiosInstance.post('/', appointment)).pipe(
            map((response: any) => response.data)
        );
    }
}
