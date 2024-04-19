import { Injectable } from '@angular/core';
import { Auth, authState , signInWithEmailAndPassword, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { Firestore, CollectionReference, addDoc, collection, deleteDoc, doc, updateDoc, collectionData, Query, docData} from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { FeedbackService } from '../feedback/feedback.service';
import { DocumentReference } from '@angular/fire/firestore';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authState$ = authState(this.afAuth)
  estudianteCollection = collection(this.firestore, 'estudiantes');
  personalCollection = collection(this.firestore, 'personal');
  formsCollection = collection(this.firestore, 'forms')
  registerPersonalCollection = collection(this.firestore, 'register-personal')



  constructor(
    private afAuth: Auth,
    private firestore: Firestore,
    private router: Router,
    private FbService: FeedbackService,

  ) { }

  //register Estudiantes
   register(email: string, password: string, id: string, name: string, firstname: string, lastname: string, birthday: string, tutor: string, phone: string) {

     addDoc(this.estudianteCollection, <Estudiante> { id , email, password, name, firstname, lastname, birthday, tutor, phone }).then((documentReference: DocumentReference) => {
     console.log(`Document written with ID: ${documentReference.id}`);
      createUserWithEmailAndPassword(this.afAuth, email, password)
      .then(() => {
        // El usuario se ha registrado correctamente
        this.FbService.showToast('Registro exitoso');
      });
        this.afAuth.signOut()
        //redirect to login
        this.router.navigate(['/login']);
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          this.FbService.showAlert('Error','Este usuario (correo) ya esta registrado');
        }
        else if(error.code === 'auth/invalid-email'){
          this.FbService.showAlert('Error','Usuario (correo) inválido')
        }
        console.error(error);
      });
  }

  //register Personal
  registerPersonal(email: string, password: string, name: string, firstname: string, lastname: string, birthday: string, functionP: string,) {

    addDoc(this.personalCollection, <Personal> { email, password, name, firstname, lastname, birthday, functionP }).then((documentReference: DocumentReference) => {
    console.log(`Document written with ID: ${documentReference.id}`);
    })
    createUserWithEmailAndPassword(this.afAuth, email, password)
    .then(() => {
       // El usuario se ha registrado correctamente
       this.FbService.showToast('Registro exitoso');
        this.afAuth.signOut()
        //redirect to login
        this.router.navigate(['/login']);
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          this.FbService.showAlert('Error','Este usuario (correo) ya esta registrado');
        }
        else if(error.code === 'auth/invalid-email'){
          this.FbService.showAlert('Error','Usuario (correo) inválido')
        }
        console.error(error);
      });

  }

  async login(email: string, password: string) {
      await signInWithEmailAndPassword(this.afAuth, email, password)
      .then(() => {
        // El usuario ha iniciado sesión correctamente
        this.FbService.showToast('Inicio de sesión exitoso');
        this.router.navigate(['/home']);
      })
      .catch(error => {
        if (error.code === 'auth/wrong-password') {
          this.FbService.showToast('Contraseña incorrecta');
        }
        else if(error.code === 'auth/user-not-found'){
          this.FbService.showToast('Usuario no registrado');
        }
        else {
          this.FbService.showToast('Error al iniciar sesión');
        }
      });
    }

  logout() {
    return this.afAuth.signOut();
  }
  //functions estudiante
  getEstudiante(id: string) {
    const estudianteDocumentReference =  doc(this.firestore, `estudiantes/${id}`);
    return docData(estudianteDocumentReference, { idField: 'id' });
  }
  getAllEstudiantes() {
    return collectionData(this.estudianteCollection, {
      idField: 'id'
    }) as Observable<Estudiante[]>
  }

    async updateEstudiante(estudiante: Estudiante): Promise<void> {
      try {
          if (!estudiante.id) {
              throw new Error('ID de estudiante no proporcionado');
          }
          const estudianteDocumentReference = doc(this.firestore, `estudiantes/${estudiante.id}`);
          //feedback service
          this.FbService.showToast('Estudiante actualizado correctamente');
          // Pasa un objeto plano a updateDoc
          await updateDoc(estudianteDocumentReference, { ...estudiante });

      } catch (error) {
          console.error('Error actualizando estudiante:', error);
      }
  }


  deleteEstudiante(id: string) {
    const estudianteDocumentReference = doc(
      this.firestore,
      `estudiantes/${id}`
    );
    return deleteDoc(estudianteDocumentReference);
  }
  //Forms collection (this is a forms)
  getAllForms() {
    return collectionData(this.formsCollection, {
      idField: 'id'
    }) as Observable<[]>
  }

  //Register personal (this is a forms)
  getAllRegisterPersonal() {
    return collectionData(this.registerPersonalCollection, {
      idField: 'id'
    }) as Observable<[]>
  }

  //collection Personal Functions
  getAllPersonal() {
    return collectionData(this.personalCollection, {
      idField: 'id'
    }) as Observable<Personal[]>
  }

  UpdatePersonal(Personal: Personal) {
    const personalDocumentReference = doc(
      this.firestore,
      `personal/${Personal.id}`
    );
    return updateDoc(personalDocumentReference, { ...Personal });
  }

  deletePersonal(id: string) {
    const personalDocumentReference = doc(
      this.firestore,
      `personal/${id}`
    );
    return deleteDoc(personalDocumentReference);
  }

}

export interface Personal {
  email: string;
  password: string;
  name: string;
  firstname: string;
  lastname: string;
  birthday: string;
  functionP: string;
  id: string
}

export interface Estudiante{
  id: string,
  email: string,
  name: string,
  firstname: string,
  lastname: string,
  birthday: string,
  tutor: string,
  phone: string
}
