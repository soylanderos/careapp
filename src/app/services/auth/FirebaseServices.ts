import { Injectable } from '@angular/core';
import { Auth, authState , signInWithEmailAndPassword, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { Firestore, CollectionReference, DocumentData, addDoc, collection, deleteDoc, doc, updateDoc, collectionData,} from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { FeedbackService } from '../feedback/feedback.service';
import { DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';


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
   register(email: string, password: string, name: string, firstname: string, lastname: string, birthday: string, tutor: string,) {
      const user = this.afAuth.currentUser;
      const uid = user?.uid;
     addDoc(this.estudianteCollection, <Estudiante> { uid, email, password, name, firstname, lastname, birthday, tutor }).then((documentReference: DocumentReference) => {
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
    const user = this.afAuth.currentUser;
    const uid = user?.uid;
    addDoc(this.personalCollection, <Personal> { uid, email, password, name, firstname, lastname, birthday, functionP }).then((documentReference: DocumentReference) => {
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
  //collection students Functions
  getAllEstudiantes() {
    return collectionData(this.estudianteCollection, {
      idField: 'id'
    }) as Observable<Estudiante[]>
  }

  UpdateEstudiante(Estudiante: Estudiante) {
    const estudianteDocumentReference = doc(
      this.firestore,
      `estudiantes/${Estudiante.uid}`
    );
    return updateDoc(estudianteDocumentReference, { ...Estudiante });
  }

  deleteEstudiante(uid: string) {
    const estudianteDocumentReference = doc(
      this.firestore,
      `estudiantes/${uid}`
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
      `personal/${Personal.uid}`
    );
    return updateDoc(personalDocumentReference, { ...Personal });
  }

  deletePersonal(uid: string) {
    const personalDocumentReference = doc(
      this.firestore,
      `personal/${uid}`
    );
    return deleteDoc(personalDocumentReference);
  }

}

export interface Personal {
  uid: string;
  email: string;
  password: string;
  name: string;
  firstname: string;
  lastname: string;
  birthday: string;
  functionP: string;
}

export interface Estudiante{
  uid: string,
  email: string,
  name: string,
  firstname: string,
  lastname: string,
  birthday: string,
  tutor: string
}
