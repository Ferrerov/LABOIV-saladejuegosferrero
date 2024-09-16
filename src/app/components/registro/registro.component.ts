import { Component, signal, ChangeDetectionStrategy, inject } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { Router } from '@angular/router';
import { FormBuilder, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Firestore, collection, collectionData,setDoc, DocumentData, doc } from '@angular/fire/firestore';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.scss',
  //changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistroComponent {
  router = inject(Router);
  formbuilder = inject(FormBuilder);
  //http = inject(HttpClient);
  authService = inject(AuthService);
  StrongPasswordRegx: RegExp =
  /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,16}/;
  
  hide = signal(true);
  errorFirebase : string | null = null;

  form = this.formbuilder.nonNullable.group({
    correo: ['', [Validators.required, Validators.email]],
    usuario: ['', Validators.required],
    contrasena: ['',[Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/),Validators.minLength(8),],]
  });

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  onSubmit() : void{
    const rawForm = this.form.getRawValue();
    this.authService.register(rawForm.correo, rawForm.usuario ,rawForm.contrasena)
    .subscribe({
      next: () => {this.router.navigateByUrl('/login');},
      error: (err) => {
        console.log(err.code);
        switch (err.code) {
          case 'auth/email-already-in-use': this.errorFirebase = 'El correo ingresado ya existe';
          break;
          case 'auth/invalid-email': this.errorFirebase = 'El correo ingresado no es valido';
          break;
          default: 'Error al registrarse'
        }
      }
    });

    console.log('login exitoso')
  }

}
