import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {Auth, signInWithEmailAndPassword, signOut, User, user} from '@angular/fire/auth';
import {Router} from "@angular/router";
import {FirebaseError} from "@angular/fire/app";
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: Observable<User | null>;

  constructor(
    private auth: Auth,
    private router: Router,
    private toastr: ToastrService) {
    this.user = user(auth)
  }

  async loginWithEmailAndPassword(email: string, password: string) {
    try {
      await signInWithEmailAndPassword(this.auth, email, password);
      await this.router.navigateByUrl("/")
    } catch (err) {
      if (err instanceof FirebaseError) {
        console.log(err.code)
        switch (err.code) {
          case 'auth/wrong-password':
            this.toastr.error("Verifique sus credenciales");
            break;
          case 'auth/too-many-requests':
            this.toastr.error("Demasiados intentos, intenta más tarde");
            break;
          case 'auth/user-not-found':
            this.toastr.error("Usuario no encontrado");
            break;
          default:
            this.toastr.error("Error desconocido");
            break;

        }
      }
    }

  }

  async logout() {
    await signOut(this.auth)
    await this.router.navigateByUrl("/login")
  }
}
