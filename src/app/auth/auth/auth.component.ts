import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from '../services/auth.service';
import {ToastrService} from "ngx-toastr";


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  hide = true;
  formAuth: FormGroup

  readonly MAX_LENGTH_EMAIL = 50;
  readonly MAX_LENGTH_PASSWORD = 50;

  isAuthenticating = false;

  constructor(
    private auth: AuthService,
    private toastr: ToastrService
  ) {
    this.formAuth = new FormGroup(
      {
        email: new FormControl('', [
          Validators.required,
          Validators.maxLength(this.MAX_LENGTH_EMAIL)
        ]),
        password: new FormControl('', [
          Validators.required,
          Validators.maxLength(this.MAX_LENGTH_PASSWORD)])
      }
    );
  }

  ngOnInit(): void {
  }

  async validateAndSend() {
    if (this.formAuth.valid) {
      this.isAuthenticating = true;
      let email = this.formAuth.controls['email'].value;
      let password = this.formAuth.controls['password'].value;
      await this.auth.loginWithEmailAndPassword(email, password)
      this.isAuthenticating = false;
    }
  }
}
